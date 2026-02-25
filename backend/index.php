<?php
require_once __DIR__ . '/config/Database.php';

setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/api';

// Remove /api prefix and clean up path
$route = str_replace($basePath, '', $path);
$route = trim($route, '/');

// Parse route
$parts = explode('/', $route);
$resource = $parts[0] ?? null;

try {
    if (!$resource) {
        sendResponse([
            'message' => 'Siragugal API',
            'version' => '1.0.0',
            'endpoints' => [
                '/api/products' => 'Product management',
                '/api/sales' => 'Sales management',
                '/api/reports' => 'Reports generation',
                '/api/dashboard/stats' => 'Dashboard statistics'
            ]
        ]);
    }

    // Route requests to appropriate handlers
    switch ($resource) {
        case 'products':
            require __DIR__ . '/api/products.php';
            break;
        case 'sales':
            require __DIR__ . '/api/sales.php';
            break;
        case 'reports':
            require __DIR__ . '/api/reports.php';
            break;
        case 'dashboard':
            require __DIR__ . '/api/dashboard.php';
            break;
        default:
            sendResponse(null, false, 'Endpoint not found', 404);
    }
} catch (Exception $e) {
    if (APP_DEBUG) {
        handleError($e->getMessage(), 500);
    } else {
        handleError('Internal server error', 500);
    }
}
?>
