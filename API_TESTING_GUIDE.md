# API Testing Guide

## Testing the Siragugal API

This guide helps you test the API endpoints using curl or Postman.

## Prerequisites

- Backend running: `php -S localhost:8000`
- MySQL database created and populated
- Database migrations applied

## Base URL

```
http://localhost:8000/api
```

---

## 1. Products Endpoints

### Get All Products
```bash
curl -X GET http://localhost:8000/api/products \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Fertilizer A",
      "category": "Fertilizers",
      "quantity": 100,
      "price": 25.50,
      "description": "Organic fertilizer",
      "created_at": "2026-02-25 10:30:00",
      "updated_at": "2026-02-25 10:30:00"
    }
  ]
}
```

### Get Single Product
```bash
curl -X GET http://localhost:8000/api/products/1 \
  -H "Content-Type: application/json"
```

### Create Product
```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fertilizer B",
    "category": "Fertilizers",
    "quantity": 50,
    "price": 30.00,
    "description": "Premium organic fertilizer"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Fertilizer B",
    "category": "Fertilizers",
    "quantity": 50,
    "price": 30,
    "description": "Premium organic fertilizer"
  },
  "message": "Product created successfully"
}
```

### Update Product
```bash
curl -X PUT http://localhost:8000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 75,
    "price": 28.50
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:8000/api/products/1 \
  -H "Content-Type: application/json"
```

---

## 2. Sales Endpoints

### Get All Sales
```bash
curl -X GET http://localhost:8000/api/sales \
  -H "Content-Type: application/json"
```

### Create Sale
```bash
curl -X POST http://localhost:8000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 10,
    "totalPrice": 250.00,
    "saleDate": "2026-02-25",
    "notes": "Bulk order"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_id": 1,
    "quantity": 10,
    "total_price": 250,
    "sale_date": "2026-02-25",
    "notes": "Bulk order"
  },
  "message": "Sale recorded successfully"
}
```

### Update Sale
```bash
curl -X PUT http://localhost:8000/api/sales/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 15,
    "totalPrice": 375.00
  }'
```

### Delete Sale
```bash
curl -X DELETE http://localhost:8000/api/sales/1 \
  -H "Content-Type: application/json"
```

---

## 3. Reports Endpoints

### Get All Reports
```bash
curl -X GET http://localhost:8000/api/reports \
  -H "Content-Type: application/json"
```

### Generate Sales Report
```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sales"
  }'
```

### Generate Inventory Report
```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "inventory"
  }'
```

### Generate Revenue Report
```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "revenue"
  }'
```

### Generate Product Report
```bash
curl -X POST http://localhost:8000/api/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "product"
  }'
```

---

## 4. Dashboard Endpoints

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:8000/api/dashboard/stats \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalProducts": 5,
    "totalSales": 1250.50,
    "inventoryValue": 5000.00,
    "recentSalesCount": 3,
    "lowStockItems": 1,
    "totalCategories": 3,
    "monthlyRevenue": 2500.00
  }
}
```

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Create new Collection: "Siragugal API"
3. Add requests for each endpoint
4. Set Base URL: `http://localhost:8000/api`
5. Add Header: `Content-Type: application/json`

### Example Request

**Request:**
```
POST /products
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Test Product",
  "category": "Test",
  "quantity": 100,
  "price": 25.00,
  "description": "Test description"
}
```

---

## Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Missing/invalid parameters |
| 404 | Not Found - Resource not found |
| 405 | Method Not Allowed - Invalid HTTP method |
| 500 | Server Error - Internal server error |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Testing Workflow

1. **Create Products**
   - Add 3-5 test products
   - Verify response

2. **Create Sales**
   - Create sales for existing products
   - Track inventory reduction

3. **Generate Reports**
   - Generate each report type
   - Verify data accuracy

4. **Check Dashboard**
   - Verify statistics are calculated
   - Confirm values match database

5. **Update & Delete**
   - Test update operations
   - Test delete operations
   - Verify cascade deletes

---

## Database Verification

### Check Products
```sql
SELECT * FROM products;
```

### Check Sales
```sql
SELECT s.*, p.name as product_name 
FROM sales s
JOIN products p ON s.product_id = p.id;
```

### Check Reports
```sql
SELECT * FROM reports;
```

### Total Sales Amount
```sql
SELECT SUM(total_price) as total_sales FROM sales;
```

### Inventory Value
```sql
SELECT SUM(quantity * price) as inventory_value FROM products;
```

---

## Frontend Testing

Once API is verified, test frontend:

1. Start frontend: `npm run dev`
2. Open http://localhost:3000
3. Navigate to each page
4. Verify data loads correctly
5. Test CRUD operations
6. Check error handling

---

## Troubleshooting

### "API connection failed"
- Ensure backend is running on port 8000
- Check firewall settings
- Verify database connection

### "No data in response"
- Check if database is properly populated
- Verify SQL queries in models
- Check error logs

### "405 Method Not Allowed"
- Verify correct HTTP method is used
- Check API router configuration
- Ensure endpoint exists

### "CORS error"
- Check FRONTEND_URL in backend .env
- Verify setCorsHeaders() is called
- Clear browser cache

---

## Performance Testing

### Load Test with Multiple Requests
```bash
# Create 100 products
for i in {1..100}; do
  curl -X POST http://localhost:8000/api/products \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Product$i\",\"category\":\"Test\",\"quantity\":$i,\"price\":$i.50,\"description\":\"Test\"}"
done
```

### Monitor Response Times
```bash
time curl -X GET http://localhost:8000/api/products
```

---

## Notes

- All timestamps are in UTC
- Prices are in decimal format (10,2)
- Quantities are integers
- Sale dates format: YYYY-MM-DD
- All requests return JSON

---

*Happy Testing! 🌾*
