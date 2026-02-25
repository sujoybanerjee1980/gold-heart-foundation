<?php
require_once __DIR__ . '/../config/Database.php';

setCorsHeaders();

$db = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    if ($method === 'GET' && strpos($path, '/generate') === false) {
        // GET /api/reports - List all reports
        $query = "SELECT * FROM reports ORDER BY generated_at DESC LIMIT 100";
        $result = $db->query($query);
        
        if (!$result) {
            sendResponse(null, false, 'Failed to fetch reports', 500);
        }
        
        $reports = $result->fetch_all(MYSQLI_ASSOC);
        sendResponse($reports);
    } elseif ($method === 'POST' && strpos($path, '/generate') !== false) {
        // POST /api/reports/generate - Generate new report
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['type'])) {
            sendResponse(null, false, 'Missing report type', 400);
        }

        $type = $input['type'];
        $reportData = [];
        $title = '';

        if ($type === 'sales') {
            $title = 'Sales Report - ' . date('Y-m-d');
            $result = $db->query("
                SELECT p.name, SUM(s.quantity) as total_quantity, SUM(s.total_price) as total_revenue
                FROM sales s
                JOIN products p ON s.product_id = p.id
                GROUP BY p.id
            ");
            $reportData = $result->fetch_all(MYSQLI_ASSOC);
        } elseif ($type === 'inventory') {
            $title = 'Inventory Report - ' . date('Y-m-d');
            $result = $db->query("
                SELECT name, category, quantity, price, (quantity * price) as value
                FROM products
                ORDER BY category
            ");
            $reportData = $result->fetch_all(MYSQLI_ASSOC);
        } elseif ($type === 'revenue') {
            $title = 'Revenue Report - ' . date('Y-m-d');
            $result = $db->query("
                SELECT DATE(sale_date) as date, SUM(total_price) as daily_revenue
                FROM sales
                WHERE sale_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                GROUP BY DATE(sale_date)
                ORDER BY date DESC
            ");
            $reportData = $result->fetch_all(MYSQLI_ASSOC);
        } elseif ($type === 'product') {
            $title = 'Product Report - ' . date('Y-m-d');
            $result = $db->query("
                SELECT id, name, category, quantity, price, created_at
                FROM products
                ORDER BY name
            ");
            $reportData = $result->fetch_all(MYSQLI_ASSOC);
        }

        // Insert report into database
        $dataJson = json_encode($reportData);
        $query = "INSERT INTO reports (title, type, data) VALUES (?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("sss", $title, $type, $dataJson);

        if ($stmt->execute()) {
            $reportId = $db->insert_id;
            $report = [
                'id' => $reportId,
                'title' => $title,
                'type' => $type,
                'data' => $reportData,
                'generated_at' => date('Y-m-d H:i:s')
            ];
            sendResponse($report, true, 'Report generated successfully', 201);
        } else {
            sendResponse(null, false, 'Failed to generate report', 500);
        }
    } else {
        sendResponse(null, false, 'Method not allowed', 405);
    }
} catch (Exception $e) {
    if (APP_DEBUG) {
        handleError($e->getMessage(), 500);
    } else {
        handleError('Internal server error', 500);
    }
}
?>
