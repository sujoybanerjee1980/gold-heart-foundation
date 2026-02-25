# Siragugal Agricultural Management System

## Overview

A comprehensive full-stack agricultural management solution built with modern web technologies.

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- PHP 7.4+
- MySQL 5.7+

### Installation

1. **Clone/Setup Project**
```bash
# Already in project directory
cd new-project
```

2. **Run Setup Script**
```bash
# On macOS/Linux
bash setup.sh

# On Windows
setup.bat
```

3. **Setup Database**
```bash
mysql -u root -p < database/migrations/001_initial_schema.sql
```

4. **Start Backend**
```bash
cd backend
php -S localhost:8000
```

5. **Start Frontend** (in new terminal)
```bash
cd frontend
npm run dev
```

6. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## Project Structure

```
├── frontend/              # React TypeScript Frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service
│   │   └── types/        # Type definitions
│   └── package.json
├── backend/              # PHP REST API
│   ├── api/             # API endpoints
│   ├── models/          # Database models
│   ├── config/          # Configuration
│   └── index.php        # Router
└── database/            # Database files
    └── migrations/      # SQL schemas
```

## Features

✅ **Dashboard** - Real-time statistics and analytics
✅ **Inventory** - Product management with stock tracking
✅ **Sales** - Sales recording and history
✅ **Reports** - Multiple report types (sales, inventory, revenue)
✅ **Settings** - Application configuration
✅ **Responsive UI** - Mobile-friendly interface

## Technologies

- **Frontend**: React 18, TypeScript, React Router, Axios, CSS3
- **Backend**: PHP 7.4+, MySQL 5.7+, REST API
- **Tools**: Node.js, npm, Git

## Documentation

- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [frontend/README.md](frontend/README.md) - Frontend documentation
- [backend/README.md](backend/README.md) - Backend API documentation

## Default Credentials

- Email: admin@siragugal.com
- Password: admin123

## Troubleshooting

See [QUICKSTART.md](QUICKSTART.md) for common issues and solutions.

## Support

For help, refer to the documentation files in the project root.

---

**🌾 Happy Farming!**
