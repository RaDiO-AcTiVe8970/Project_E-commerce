#!/bin/bash

# E-commerce Marketplace Platform - Quick Start Script
# This script helps you set up the development environment quickly

set -e  # Exit on any error

echo "🚀 E-commerce Marketplace Platform - Quick Start"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    print_success "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm -v)
    print_success "npm installed: $NPM_VERSION"
else
    print_error "npm is not installed"
    exit 1
fi

# Check Docker (optional)
if command_exists docker; then
    DOCKER_VERSION=$(docker -v)
    print_success "Docker installed: $DOCKER_VERSION"
    DOCKER_AVAILABLE=true
else
    print_warning "Docker is not installed (optional)"
    DOCKER_AVAILABLE=false
fi

# Check PostgreSQL
if command_exists psql; then
    PSQL_VERSION=$(psql --version)
    print_success "PostgreSQL installed: $PSQL_VERSION"
    POSTGRES_AVAILABLE=true
else
    print_warning "PostgreSQL is not installed (required for manual setup)"
    POSTGRES_AVAILABLE=false
fi

# Check Redis
if command_exists redis-cli; then
    print_success "Redis installed"
    REDIS_AVAILABLE=true
else
    print_warning "Redis is not installed (required for manual setup)"
    REDIS_AVAILABLE=false
fi

echo ""
echo "=================================="
echo ""

# Ask user for setup method
echo "Choose setup method:"
echo "1. Docker (Recommended - runs everything in containers)"
echo "2. Manual (Local development)"
echo ""
read -p "Enter choice (1 or 2): " SETUP_METHOD

if [ "$SETUP_METHOD" = "1" ]; then
    if [ "$DOCKER_AVAILABLE" = false ]; then
        print_error "Docker is not installed. Please install Docker first or choose manual setup."
        exit 1
    fi
    
    echo ""
    echo "🐳 Setting up with Docker..."
    echo ""
    
    # Check if environment files exist
    if [ ! -f "project_ecomm_back/.env" ]; then
        echo "Creating backend .env file..."
        cp project_ecomm_back/.env.example project_ecomm_back/.env
        print_warning "Please edit project_ecomm_back/.env with your configuration"
    fi
    
    if [ ! -f "project_ecomm_front/.env.local" ]; then
        echo "Creating frontend .env.local file..."
        cp project_ecomm_front/.env.local.example project_ecomm_front/.env.local
        print_warning "Please edit project_ecomm_front/.env.local with your configuration"
    fi
    
    echo ""
    read -p "Have you configured the environment files? (y/n): " ENV_CONFIGURED
    
    if [ "$ENV_CONFIGURED" != "y" ]; then
        print_warning "Please configure the environment files and run this script again."
        exit 0
    fi
    
    echo ""
    echo "Starting Docker containers..."
    docker-compose up -d
    
    echo ""
    echo "Waiting for services to start..."
    sleep 10
    
    echo "Running database migrations..."
    docker-compose exec -T backend npm run prisma:generate
    docker-compose exec -T backend npm run prisma:migrate
    
    print_success "Docker setup complete!"
    echo ""
    echo "Services are running at:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend API: http://localhost:3001"
    echo "- API Docs: http://localhost:3001/api/docs"
    echo ""
    echo "View logs with: docker-compose logs -f"
    echo "Stop services with: docker-compose down"
    
elif [ "$SETUP_METHOD" = "2" ]; then
    if [ "$POSTGRES_AVAILABLE" = false ] || [ "$REDIS_AVAILABLE" = false ]; then
        print_error "PostgreSQL and Redis are required for manual setup."
        echo "Install them first or use Docker setup."
        exit 1
    fi
    
    echo ""
    echo "🔧 Setting up manually..."
    echo ""
    
    # Backend setup
    echo "📦 Setting up backend..."
    cd project_ecomm_back
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Created .env file. Please configure it."
    fi
    
    echo "Installing backend dependencies..."
    npm install
    
    echo "Generating Prisma client..."
    npm run prisma:generate
    
    echo "Running database migrations..."
    npm run prisma:migrate
    
    cd ..
    
    # Frontend setup
    echo ""
    echo "🎨 Setting up frontend..."
    cd project_ecomm_front
    
    if [ ! -f ".env.local" ]; then
        cp .env.local.example .env.local
        print_warning "Created .env.local file. Please configure it."
    fi
    
    echo "Installing frontend dependencies..."
    npm install
    
    cd ..
    
    print_success "Manual setup complete!"
    echo ""
    echo "To start the application:"
    echo ""
    echo "Terminal 1 (Backend):"
    echo "  cd project_ecomm_back"
    echo "  npm run start:dev"
    echo ""
    echo "Terminal 2 (Frontend):"
    echo "  cd project_ecomm_front"
    echo "  npm run dev"
    echo ""
    echo "Then visit:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend API: http://localhost:3001"
    echo "- API Docs: http://localhost:3001/api/docs"
    
else
    print_error "Invalid choice. Please run the script again and choose 1 or 2."
    exit 1
fi

echo ""
echo "=================================="
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Configure external services (Stripe, Cloudinary) - see SETUP_GUIDE.md"
echo "2. Create your first user account"
echo "3. Start building your marketplace!"
echo ""
echo "📖 Documentation:"
echo "- Complete Setup Guide: SETUP_GUIDE.md"
echo "- Backend README: project_ecomm_back/README.md"
echo "- Frontend README: project_ecomm_front/README.md"
echo "- Development Guidelines: copilot_instructions.md"
echo ""
echo "Need help? Check the documentation or open an issue on GitHub."
echo ""
