<?php
require_once __DIR__ . '/../config/Database.php';

setCorsHeaders();

$db = getDbConnection();

try {
    // Get dashboard statistics
    $stats = [];

    // Total products
    $result = $db->query("SELECT COUNT(*) as count FROM products");
    $stats['totalProducts'] = $result->fetch_assoc()['count'];

    // Total sales
    $result = $db->query("SELECT SUM(total_price) as total FROM sales");
    $row = $result->fetch_assoc();
    $stats['totalSales'] = $row['total'] ?? 0;

    // Inventory value
    $result = $db->query("SELECT SUM(quantity * price) as value FROM products");
    $row = $result->fetch_assoc();
    $stats['inventoryValue'] = $row['value'] ?? 0;

    // Recent sales count (last 30 days)
    $result = $db->query("SELECT COUNT(*) as count FROM sales WHERE sale_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $stats['recentSalesCount'] = $result->fetch_assoc()['count'];

    // Low stock items
    $result = $db->query("SELECT COUNT(*) as count FROM products WHERE quantity < 10");
    $stats['lowStockItems'] = $result->fetch_assoc()['count'];

    // Total categories
    $result = $db->query("SELECT COUNT(DISTINCT category) as count FROM products WHERE category IS NOT NULL AND category != ''");
    $stats['totalCategories'] = $result->fetch_assoc()['count'];

    // Monthly revenue
    $result = $db->query("SELECT SUM(total_price) as total FROM sales WHERE MONTH(sale_date) = MONTH(NOW()) AND YEAR(sale_date) = YEAR(NOW())");
    $row = $result->fetch_assoc();
    $stats['monthlyRevenue'] = $row['total'] ?? 0;

    sendResponse($stats);
} catch (Exception $e) {
    if (APP_DEBUG) {
        handleError($e->getMessage(), 500);
    } else {
        handleError('Internal server error', 500);
    }
}
?>
