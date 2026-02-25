# Backend Documentation

## Setup

1. Create the database:
```bash
mysql -u root -p < database/migrations/001_initial_schema.sql
```

2. Update `.env` with your database configuration

3. Start PHP server:
```bash
php -S localhost:8000
```

## API Endpoints

### Products

#### Get All Products
```
GET /api/products
Response: Array of products
```

#### Get Single Product
```
GET /api/products/{id}
Response: Product object
```

#### Create Product
```
POST /api/products
Body: {
  "name": "string",
  "category": "string",
  "quantity": number,
  "price": number,
  "description": "string"
}
Response: Created product object
```

#### Update Product
```
PUT /api/products/{id}
Body: {fields to update}
Response: Updated product object
```

#### Delete Product
```
DELETE /api/products/{id}
Response: Success message
```

### Sales

#### Get All Sales
```
GET /api/sales
Response: Array of sales
```

#### Create Sale
```
POST /api/sales
Body: {
  "productId": number,
  "quantity": number,
  "totalPrice": number,
  "saleDate": "YYYY-MM-DD",
  "notes": "string"
}
Response: Created sale object
```

#### Update Sale
```
PUT /api/sales/{id}
Body: {fields to update}
Response: Updated sale object
```

#### Delete Sale
```
DELETE /api/sales/{id}
Response: Success message
```

### Reports

#### Get All Reports
```
GET /api/reports
Response: Array of reports
```

#### Generate Report
```
POST /api/reports/generate
Body: {
  "type": "sales|inventory|revenue|product"
}
Response: Generated report object
```

### Dashboard

#### Get Dashboard Stats
```
GET /api/dashboard/stats
Response: {
  "totalProducts": number,
  "totalSales": number,
  "inventoryValue": number,
  "recentSalesCount": number,
  "lowStockItems": number,
  "totalCategories": number,
  "monthlyRevenue": number
}
```

## Database Models

### Product Model
- getAll(): Fetch all products
- getById($id): Fetch specific product
- create(): Create new product
- update($id): Update existing product
- delete($id): Delete product
- getLowStock($threshold): Get products below threshold

### Sale Model
- getAll(): Fetch all sales
- getById($id): Fetch specific sale
- create(): Create new sale
- update($id): Update sale
- delete($id): Delete sale
- getTotalSales(): Get total sales amount
- getTotalSalesByDate($start, $end): Get sales total by date range

## Error Handling

All endpoints return standardized JSON responses:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## CORS Configuration

CORS is configured in `config/Database.php` to allow requests from `FRONTEND_URL`.

Update the `setCorsHeaders()` function to change allowed origins.
