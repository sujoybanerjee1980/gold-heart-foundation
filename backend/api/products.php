<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Product.php';

setCorsHeaders();

$db = getDbConnection();
$product = new Product($db);

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = explode('/', trim($path, '/'));

// Extract product ID if present in URL
$id = null;
if (count($parts) >= 3 && is_numeric($parts[count($parts) - 1])) {
    $id = (int)$parts[count($parts) - 1];
}

try {
    if ($method === 'GET') {
        if ($id) {
            // GET /api/products/{id}
            $data = $product->getById($id);
            if (!$data) {
                sendResponse(null, false, 'Product not found', 404);
            }
            sendResponse($data);
        } else {
            // GET /api/products
            $data = $product->getAll();
            sendResponse($data);
        }
    } elseif ($method === 'POST') {
        // POST /api/products
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['name']) || !isset($input['price'])) {
            sendResponse(null, false, 'Missing required fields', 400);
        }

        $product->name = $input['name'];
        $product->category = $input['category'] ?? '';
        $product->quantity = (int)($input['quantity'] ?? 0);
        $product->price = (float)$input['price'];
        $product->description = $input['description'] ?? '';

        if ($product->create()) {
            sendResponse($product, true, 'Product created successfully', 201);
        } else {
            sendResponse(null, false, 'Failed to create product', 500);
        }
    } elseif ($method === 'PUT') {
        // PUT /api/products/{id}
        if (!$id) {
            sendResponse(null, false, 'Product ID required', 400);
        }

        $input = json_decode(file_get_contents('php://input'), true);
        
        // Get existing product
        $existing = $product->getById($id);
        if (!$existing) {
            sendResponse(null, false, 'Product not found', 404);
        }

        $product->id = $id;
        $product->name = $input['name'] ?? $existing['name'];
        $product->category = $input['category'] ?? $existing['category'];
        $product->quantity = isset($input['quantity']) ? (int)$input['quantity'] : $existing['quantity'];
        $product->price = $input['price'] ?? $existing['price'];
        $product->description = $input['description'] ?? $existing['description'];

        if ($product->update($id)) {
            $updated = $product->getById($id);
            sendResponse($updated, true, 'Product updated successfully');
        } else {
            sendResponse(null, false, 'Failed to update product', 500);
        }
    } elseif ($method === 'DELETE') {
        // DELETE /api/products/{id}
        if (!$id) {
            sendResponse(null, false, 'Product ID required', 400);
        }

        if ($product->delete($id)) {
            sendResponse(null, true, 'Product deleted successfully');
        } else {
            sendResponse(null, false, 'Failed to delete product', 500);
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
