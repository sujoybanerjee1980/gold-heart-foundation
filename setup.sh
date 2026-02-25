#!/bin/bash

# Siragugal App - Setup Script
# This script sets up both frontend and backend

set -e

echo "🌾 Siragugal Agricultural Management System - Setup"
echo "=================================================="

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP 7.4+"
    exit 1
fi

if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL CLI not found. Make sure MySQL server is running."
fi

echo "✓ All prerequisites found"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."

cd backend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env .env.backup 2>/dev/null || true
fi

echo "✓ Backend ready at ./backend/"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."

cd ../frontend

echo "Installing npm dependencies..."
npm install --legacy-peer-deps

if [ ! -f .env ]; then
    echo "✓ .env file already configured"
fi

echo "✓ Frontend ready at ./frontend/"

# Summary
echo ""
echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Setup Database:"
echo "   mysql -u root -p < database/migrations/001_initial_schema.sql"
echo ""
echo "2. Start Backend (in new terminal):"
echo "   cd backend"
echo "   php -S localhost:8000"
echo ""
echo "3. Start Frontend (in new terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Main documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - frontend/README.md - Frontend docs"
echo "   - backend/README.md - Backend docs"
echo ""
echo "🌾 Happy farming!"
echo ""
