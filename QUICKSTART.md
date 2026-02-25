# Quick Start Guide - Siragugal App

## Installation

### 1. Database Setup
```bash
# Create database
mysql -u root -p < database/migrations/001_initial_schema.sql

# Or manually create and import
mysql -u root -p
CREATE DATABASE siragugal_db;
USE siragugal_db;
SOURCE database/migrations/001_initial_schema.sql;
```

### 2. Backend Setup
```bash
# Configure database credentials (if needed)
cd backend
nano .env  # Edit with your database credentials

# Start PHP development server
php -S localhost:8000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## Default Credentials

**Admin Account**
- Email: admin@siragugal.com
- Password: admin123

## Features Overview

### Dashboard
- View key statistics
- Total products, sales, inventory value
- Recent sales and low stock items
- Monthly revenue

### Inventory Management
- Add/edit/delete products
- Track stock levels
- Organize by categories
- View product details

### Sales Management
- Record new sales
- Track sales history
- View sales details
- Delete sales records

### Reports
- Generate sales reports
- Inventory reports
- Revenue analysis
- Product reports

### Settings
- Configure application preferences
- Set currency and timezone
- Update company information

## Troubleshooting

### "Unable to connect to database"
1. Ensure MySQL is running
2. Check database credentials in `backend/.env`
3. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### "CORS error" or "API not found"
1. Ensure backend is running on port 8000
2. Check `REACT_APP_API_URL` in `frontend/.env`
3. Verify both servers are running

### "npm install fails"
1. Delete `node_modules` and `package-lock.json`
2. Clear npm cache: `npm cache clean --force`
3. Run `npm install` again

### Port Already in Use
```bash
# Change PHP port
php -S localhost:9000

# Update frontend .env with new URL
REACT_APP_API_URL=http://localhost:9000/api
```

## File Structure

```
project/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app
│   └── package.json
├── backend/               # PHP API
│   ├── api/              # Endpoints
│   ├── models/           # Database models
│   ├── config/           # Configuration
│   ├── index.php         # API router
│   └── .env              # Environment
└── database/             # Database files
    └── migrations/       # SQL schemas
```

## Next Steps

1. Review the main README.md for detailed documentation
2. Check `frontend/README.md` for frontend-specific info
3. Check `backend/README.md` for backend API details
4. Customize the styling in `frontend/src/App.css`
5. Add more products and start using the app

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review individual README files
3. Check console errors in browser (F12)
4. Review PHP error logs

Happy farming! 🌾
