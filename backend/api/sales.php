<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Sale.php';

setCorsHeaders();

$db = getDbConnection();
$sale = new Sale($db);

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = explode('/', trim($path, '/'));

// Extract sale ID if present in URL
$id = null;
if (count($parts) >= 3 && is_numeric($parts[count($parts) - 1])) {
    $id = (int)$parts[count($parts) - 1];
}

try {
    if ($method === 'GET') {
        if ($id) {
            // GET /api/sales/{id}
            $data = $sale->getById($id);
            if (!$data) {
                sendResponse(null, false, 'Sale not found', 404);
            }
            sendResponse($data);
        } else {
            // GET /api/sales
            $data = $sale->getAll();
            sendResponse($data);
        }
    } elseif ($method === 'POST') {
        // POST /api/sales
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['productId']) || !isset($input['quantity']) || !isset($input['totalPrice'])) {
            sendResponse(null, false, 'Missing required fields', 400);
        }

        $sale->product_id = (int)$input['productId'];
        $sale->quantity = (int)$input['quantity'];
        $sale->total_price = (float)$input['totalPrice'];
        $sale->sale_date = $input['saleDate'] ?? date('Y-m-d');
        $sale->notes = $input['notes'] ?? '';

        if ($sale->create()) {
            sendResponse($sale, true, 'Sale recorded successfully', 201);
        } else {
            sendResponse(null, false, 'Failed to record sale', 500);
        }
    } elseif ($method === 'PUT') {
        // PUT /api/sales/{id}
        if (!$id) {
            sendResponse(null, false, 'Sale ID required', 400);
        }

        $input = json_decode(file_get_contents('php://input'), true);
        
        // Get existing sale
        $existing = $sale->getById($id);
        if (!$existing) {
            sendResponse(null, false, 'Sale not found', 404);
        }

        $sale->id = $id;
        $sale->product_id = $input['productId'] ?? $existing['product_id'];
        $sale->quantity = isset($input['quantity']) ? (int)$input['quantity'] : $existing['quantity'];
        $sale->total_price = $input['totalPrice'] ?? $existing['total_price'];
        $sale->sale_date = $input['saleDate'] ?? $existing['sale_date'];
        $sale->notes = $input['notes'] ?? $existing['notes'];

        if ($sale->update($id)) {
            $updated = $sale->getById($id);
            sendResponse($updated, true, 'Sale updated successfully');
        } else {
            sendResponse(null, false, 'Failed to update sale', 500);
        }
    } elseif ($method === 'DELETE') {
        // DELETE /api/sales/{id}
        if (!$id) {
            sendResponse(null, false, 'Sale ID required', 400);
        }

        if ($sale->delete($id)) {
            sendResponse(null, true, 'Sale deleted successfully');
        } else {
            sendResponse(null, false, 'Failed to delete sale', 500);
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
