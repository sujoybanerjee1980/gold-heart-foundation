# Siragugal Agricultural Management System

A comprehensive full-stack application for agricultural inventory management, sales tracking, and reporting. Built with React TypeScript frontend and PHP/MySQL backend.

## 🌾 Features

- **Dashboard**: Real-time statistics and analytics
- **Inventory Management**: Track products, categories, and stock levels
- **Sales Management**: Record and manage sales transactions
- **Reports Generation**: Create comprehensive sales, inventory, and revenue reports
- **Settings**: Configure application preferences
- **Responsive UI**: Modern, user-friendly interface

## 📋 Project Structure

```
siragugal-app/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main app component
│   │   ├── index.tsx        # Entry point
│   │   └── *.css            # Styling
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies
│   ├── tsconfig.json        # TypeScript config
│   └── .env                 # Environment variables
│
├── backend/                 # PHP backend
│   ├── api/                 # API endpoints
│   │   ├── products.php     # Product CRUD endpoints
│   │   ├── sales.php        # Sales CRUD endpoints
│   │   ├── reports.php      # Report generation
│   │   └── dashboard.php    # Dashboard statistics
│   ├── models/              # Database models
│   │   ├── Product.php      # Product model
│   │   └── Sale.php         # Sale model
│   ├── config/              # Configuration
│   │   └── Database.php     # Database connection
│   ├── index.php            # API router
│   └── .env                 # Environment variables
│
└── database/
    └── migrations/
        └── 001_initial_schema.sql  # Database schema
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 16+ (for frontend)
- PHP 7.4+ (for backend)
- MySQL 5.7+
- npm or yarn

### Backend Setup

1. **Create Database**
   ```bash
   mysql -u root -p < database/migrations/001_initial_schema.sql
   ```

2. **Configure Environment**
   ```bash
   cd backend
   # Edit .env with your database credentials
   cp .env.example .env
   ```

3. **Run PHP Development Server**
   ```bash
   cd backend
   php -S localhost:8000
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   # .env is already configured for localhost
   # Update REACT_APP_API_URL if your backend is on a different address
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

#### Sales
- `GET /api/sales` - List all sales
- `GET /api/sales/{id}` - Get specific sale
- `POST /api/sales` - Record new sale
- `PUT /api/sales/{id}` - Update sale
- `DELETE /api/sales/{id}` - Delete sale

#### Reports
- `GET /api/reports` - List all reports
- `POST /api/reports/generate` - Generate new report

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Request/Response Format

**Request Example**
```json
POST /api/products
Content-Type: application/json

{
  "name": "Fertilizer A",
  "category": "Fertilizers",
  "quantity": 100,
  "price": 25.50,
  "description": "Organic fertilizer"
}
```

**Response Example**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Fertilizer A",
    "category": "Fertilizers",
    "quantity": 100,
    "price": 25.50,
    "description": "Organic fertilizer",
    "created_at": "2026-02-25T10:30:00Z"
  },
  "message": "Product created successfully"
}
```

## 🗄️ Database Schema

### Products Table
```sql
- id (INT, PK)
- name (VARCHAR 255)
- category (VARCHAR 100)
- quantity (INT)
- price (DECIMAL 10,2)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Sales Table
```sql
- id (INT, PK)
- product_id (INT, FK)
- quantity (INT)
- total_price (DECIMAL 10,2)
- sale_date (DATE)
- notes (TEXT)
- created_at (TIMESTAMP)
```

### Reports Table
```sql
- id (INT, PK)
- title (VARCHAR 255)
- type (VARCHAR 50)
- data (LONGTEXT)
- generated_at (TIMESTAMP)
- created_by (INT, FK)
```

## 🎨 Frontend Components

- **Layout**: Navigation sidebar and main content area
- **StatCard**: Display key statistics
- **Table**: Reusable data table component
- **Form**: Dynamic form builder with validation
- **Pages**: Dashboard, Inventory, Sales, Reports, Settings

## 🔧 Technologies Used

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- CSS3

### Backend
- PHP 7.4+
- MySQL 5.7+
- MySQLi (Database driver)

## 📝 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=siragugal_db
DB_PORT=3306
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
APP_ENV=development
APP_DEBUG=true
```

### Frontend (.env)
```
NODE_ENV=development
REACT_APP_API_URL=http://localhost:8000/api
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env`
- Verify database `siragugal_db` exists

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check browser console for specific errors
- Ensure both frontend and backend are running

### API Not Found
- Verify backend server is running on port 8000
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure PHP rewrite rules are configured (if using Apache)

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/build directory
```

### Backend
- Deploy backend files to web server
- Update `.env` with production database credentials
- Set `APP_ENV=production` in backend `.env`

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For support or issues, please contact the development team.
