# Multi-Vendor E-Commerce Marketplace# E-commerce Marketplace Platform



A full-stack e-commerce marketplace platform built with Next.js, NestJS, PostgreSQL, and Redis. This platform allows multiple vendors to create shops and sell products, similar to Etsy.A full-stack multi-vendor marketplace platform (Etsy-like) built with Next.js and NestJS.



## 🚀 Features## 🚀 Project Overview



### Authentication & AuthorizationThis is a comprehensive e-commerce marketplace where multiple vendors can create shops and sell their products. It features:

- ✅ JWT-based authentication with access & refresh tokens

- ✅ Refresh token rotation for enhanced security- **Multi-vendor support**: Sellers can create shops and manage their products

- ✅ Role-based access control (Customer, Seller, Admin)- **User roles**: Buyers, Sellers, and Admins with different permissions

- ✅ Secure password hashing with bcrypt- **Product management**: Full CRUD operations with image uploads and inventory tracking

- ✅ Protected routes and API endpoints- **Shopping cart & checkout**: Complete purchase flow with Stripe payments

- **Review system**: Buyers can rate and review products

### User Management- **Admin dashboard**: Platform management and analytics

- ✅ User registration and login- **Commission system**: Automatic commission calculation per sale

- ✅ Profile management

- ✅ Role-based permissions## 📁 Project Structure



### Backend Features```

- ✅ RESTful API with NestJSProject_E-commerce/

- ✅ PostgreSQL database with Prisma ORM├── project_ecomm_back/      # NestJS Backend API

- ✅ Swagger API documentation at `http://localhost:3001/api/docs`├── project_ecomm_front/     # Next.js Frontend

- ✅ Security middleware (Helmet, CORS)├── docker-compose.yml       # Docker orchestration

- ✅ Request validation with class-validator└── copilot_instructions.md  # Development guidelines

- ✅ Global error handling```

- ✅ Rate limiting with ThrottlerModule

## 🛠️ Tech Stack

### Frontend Features

- ✅ Modern UI with Tailwind CSS### Backend (NestJS)

- ✅ Responsive design- **Framework**: NestJS

- ✅ Authentication pages (Login/Register)- **Database**: PostgreSQL with Prisma ORM

- ✅ Reusable UI components (Button, Input, Card, Toast, etc.)- **Authentication**: JWT with Passport

- ✅ API client with automatic token refresh- **Payment**: Stripe Connect

- ✅ Protected routes- **File Upload**: Cloudinary

- ✅ Toast notifications- **Job Queue**: Bull with Redis

- ✅ Beautiful homepage with hero section- **Documentation**: Swagger/OpenAPI



## 📋 Tech Stack### Frontend (Next.js)

- **Framework**: Next.js 14 (App Router)

### Backend- **Styling**: Tailwind CSS

- **Framework**: NestJS 11.x- **UI Components**: shadcn/ui + Radix UI

- **Database**: PostgreSQL 15- **Forms**: React Hook Form + Zod

- **ORM**: Prisma 5.22.0- **State**: TanStack Query (React Query)

- **Authentication**: JWT with Passport.js- **HTTP Client**: Axios

- **Validation**: class-validator, class-transformer

- **Documentation**: Swagger/OpenAPI## 🚦 Getting Started

- **Security**: Helmet, CORS, Throttler

- **Caching**: Redis 7### Prerequisites



### Frontend- Node.js 18+

- **Framework**: Next.js 16.1.1 (App Router)- PostgreSQL 15+

- **UI Library**: React 18- Redis 7+

- **Styling**: Tailwind CSS- Docker & Docker Compose (optional)

- **State Management**: TanStack Query (React Query)- Stripe account (for payments)

- **HTTP Client**: Axios- Cloudinary account (for image uploads)

- **Form Handling**: React Hook Form

- **Validation**: Zod### Quick Start with Docker

- **Components**: Radix UI, shadcn/ui

- **Icons**: Lucide ReactThe easiest way to run the entire application:



## 🗄️ Database Schema```bash

# Clone the repository

### Modelsgit clone <repository-url>

- **User**: User accounts with authenticationcd Project_E-commerce

- **Shop**: Vendor shop information

- **Product**: Product listings# Start all services (PostgreSQL, Redis, Backend, Frontend)

- **Category**: Product categoriesdocker-compose up -d

- **Order**: Customer orders

- **OrderItem**: Individual order items# View logs

- **Payment**: Payment recordsdocker-compose logs -f

- **Review**: Product reviews

- **CartItem**: Shopping cart items# Stop all services

docker-compose down

## 🚦 Getting Started```



### PrerequisitesServices will be available at:

- Node.js 18+ and npm- Frontend: http://localhost:3000

- Docker and Docker Compose- Backend API: http://localhost:3001

- PostgreSQL 15- API Docs: http://localhost:3001/api/docs

- Redis 7- PostgreSQL: localhost:5432

- Redis: localhost:6379

### Installation

### Manual Setup

1. **Clone the repository**

   ```bash#### Backend Setup

   git clone <repository-url>

   cd Project_E-commerce```bash

   ```cd project_ecomm_back



2. **Start Docker services**# Install dependencies

   ```bashnpm install

   docker-compose up -d postgres redis

   ```# Set up environment variables

cp .env.example .env

3. **Set up Backend**# Edit .env with your configuration

   ```bash

   cd project_ecomm_back# Generate Prisma client

   npm installnpm run prisma:generate

   

   # Environment is already configured# Run database migrations

   # Run database migrationsnpm run prisma:migrate

   npx prisma migrate dev

   # Start development server

   # Start development servernpm run start:dev

   npm run start:dev```

   ```

   Backend will run on: `http://localhost:3001`Backend will be available at http://localhost:3001

   API Docs available at: `http://localhost:3001/api/docs`

See [Backend README](./project_ecomm_back/README.md) for detailed instructions.

4. **Set up Frontend**

   ```bash#### Frontend Setup

   cd project_ecomm_front

   npm install```bash

   cd project_ecomm_front

   # Environment is already configured (.env.local)

   # Start development server# Install dependencies

   npm run devnpm install

   ```

   Frontend will run on: `http://localhost:3000`# Set up environment variables

cp .env.local.example .env.local

## 📡 API Endpoints# Edit .env.local with your configuration



### Authentication# Start development server

- `POST /api/auth/register` - Register new usernpm run dev

- `POST /api/auth/login` - Login user```

- `POST /api/auth/refresh` - Refresh access token

- `POST /api/auth/logout` - Logout userFrontend will be available at http://localhost:3000

- `GET /api/auth/me` - Get current user profile

See [Frontend README](./project_ecomm_front/README.md) for detailed instructions.

### Users

- `GET /api/users` - Get all users (Admin only)## 📚 Documentation

- `GET /api/users/me` - Get current user

- `GET /api/users/:id` - Get user by ID### API Documentation

- `PATCH /api/users/me` - Update current user

- `PATCH /api/users/:id` - Update user (Admin only)Once the backend is running, visit:

- `DELETE /api/users/:id` - Delete user (Admin only)- Swagger UI: http://localhost:3001/api/docs

- Full API documentation with interactive testing

### API Documentation

Visit `http://localhost:3001/api/docs` for interactive Swagger documentation.### Database Schema



## 🎨 Frontend RoutesThe platform uses the following main entities:



- `/` - Home page with hero section and features- **User**: User accounts with roles (BUYER, SELLER, ADMIN)

- `/auth/login` - Login page- **Shop**: Vendor shops (one per seller)

- `/auth/register` - Registration page- **Product**: Products with images, pricing, and inventory

- `/products` - Product listings (Coming soon)- **Category**: Product categorization

- `/shops` - Shop listings (Coming soon)- **Order**: Customer orders with items

- `/profile` - User profile (Coming soon)- **Payment**: Stripe payment records

- `/dashboard` - Seller dashboard (Coming soon)- **Review**: Product reviews and ratings

- `/cart` - Shopping cart (Coming soon)- **Cart**: Shopping cart items



## 🏗️ Project StructureSee [Prisma Schema](./project_ecomm_back/prisma/schema.prisma) for complete details.



### Backend## 🔑 Key Features

```

project_ecomm_back/### For Buyers

├── src/- ✅ Browse products with advanced filters

│   ├── modules/- ✅ Product detail pages with image galleries

│   │   ├── auth/          # Authentication module- ✅ Shopping cart functionality

│   │   └── users/         # Users module- ✅ Secure checkout with Stripe

│   ├── prisma/            # Prisma service- ✅ Order history and tracking

│   ├── app.module.ts- ✅ Product reviews and ratings

│   └── main.ts

├── prisma/### For Sellers

│   └── schema.prisma      # Database schema- ✅ Shop creation and management

└── package.json- ✅ Product CRUD operations

```- ✅ Multi-image upload for products

- ✅ Inventory management

### Frontend- ✅ Order fulfillment dashboard

```- ✅ Sales analytics

project_ecomm_front/- ✅ Commission tracking

├── src/

│   ├── app/               # Next.js pages### For Admins

│   │   ├── auth/         # Auth pages- ✅ User management

│   │   ├── layout.tsx- ✅ Shop verification and approval

│   │   └── page.tsx- ✅ Commission rate management

│   ├── components/- ✅ Platform-wide analytics

│   │   ├── layout/       # Layout components- ✅ Content moderation

│   │   ├── providers/    # Context providers

│   │   └── ui/           # Reusable UI components## 🔐 Authentication Flow

│   ├── lib/

│   │   ├── api/          # API client1. User registers/logs in → Receives JWT access token + refresh token

│   │   ├── hooks/        # Custom hooks2. Access token stored in localStorage

│   │   └── utils.ts3. Automatic token refresh when expired

│   └── hooks/4. Role-based access control (RBAC)

│       └── use-toast.ts

└── package.json## 💳 Payment Flow (Stripe Connect)

```

1. Seller creates Stripe Connected Account

## 🔒 Security Features2. Buyer initiates checkout

3. Payment processed through Stripe

- **Password Security**: Bcrypt hashing4. Commission deducted automatically

- **JWT Tokens**: Access tokens (15min) + Refresh tokens (7 days)5. Funds transferred to seller's account

- **Token Rotation**: Automatic refresh token rotation6. Webhook updates order status

- **CORS**: Configured for trusted origins

- **Helmet**: Security headers middleware## 🧪 Testing

- **Rate Limiting**: API throttling

- **Input Validation**: class-validator### Backend Tests

- **SQL Injection Protection**: Prisma ORM```bash

cd project_ecomm_back

## 📱 Responsive Designnpm run test          # Unit tests

npm run test:e2e      # E2E tests

Fully responsive for:npm run test:cov      # Coverage report

- Mobile devices (320px+)```

- Tablets (768px+)

- Desktops (1024px+)### Frontend Tests

- Large screens (1280px+)```bash

cd project_ecomm_front

## 🛠️ Development Scriptsnpm run test          # Component tests

npm run test:e2e      # E2E tests with Playwright

### Backend```

```bash

npm run start:dev    # Start development server## 📦 Deployment

npm run build        # Build for production

npm run start:prod   # Start production server### Backend Deployment

npm run test         # Run tests

```Recommended platforms:

- Railway

### Frontend- Heroku

```bash- AWS ECS

npm run dev          # Start development server- DigitalOcean App Platform

npm run build        # Build for production

npm run start        # Start production serverEnvironment variables needed:

npm run lint         # Run ESLint- DATABASE_URL

```- JWT_SECRET

- STRIPE_SECRET_KEY

## 📦 Docker Deployment- CLOUDINARY credentials

- SMTP credentials

```bash

# Build and start all services### Frontend Deployment

docker-compose up -d

Recommended platforms:

# View logs- Vercel (recommended for Next.js)

docker-compose logs -f- Netlify

- AWS Amplify

# Stop services

docker-compose downEnvironment variables needed:

```- NEXT_PUBLIC_API_URL

- NEXT_PUBLIC_STRIPE_PUBLIC_KEY

## 🚧 Next Steps

## 🗺️ Development Roadmap

- [ ] Shops module (CRUD operations)

- [ ] Products module (with image upload)### Phase 1: Foundation ✅

- [ ] Categories module- [x] Project setup and Docker configuration

- [ ] Orders & Checkout- [x] Database schema with Prisma

- [ ] Reviews & Ratings- [x] Authentication system (JWT)

- [ ] Search & Filters- [x] User management

- [ ] Wishlist- [x] Frontend base setup

- [ ] Admin dashboard

- [ ] Email notifications### Phase 2: Core Features (In Progress)

- [ ] Analytics- [ ] Shop management module

- [ ] Product CRUD with image uploads

## 📄 License- [ ] Category management

- [ ] Product browsing and filtering

MIT License- [ ] Shopping cart

- [ ] Order processing

## 🙏 Acknowledgments

### Phase 3: Payments & Reviews

- NestJS documentation- [ ] Stripe Connect integration

- Next.js documentation- [ ] Checkout flow

- Prisma documentation- [ ] Order fulfillment

- shadcn/ui components- [ ] Review and rating system

- Radix UI primitives

### Phase 4: Admin & Analytics
- [ ] Admin dashboard
- [ ] Platform analytics
- [ ] Commission reporting
- [ ] Email notifications

### Phase 5: Enhancement
- [ ] Advanced search (Elasticsearch)
- [ ] Real-time notifications
- [ ] Wishlist functionality
- [ ] Coupon/discount system
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [copilot_instructions.md](./copilot_instructions.md) for detailed development guidelines.

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://admin:password@localhost:5432/ecommerce
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Recreate database
docker-compose down -v
docker-compose up -d postgres
npm run prisma:migrate
```

### Frontend Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Port Already in Use
```bash
# Find and kill process on port 3000 or 3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Initial work - [Your Name]

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Next.js team for the best React framework
- shadcn for the beautiful UI components
- Stripe for payment infrastructure

## 📧 Support

For support, email support@yourapp.com or open an issue in the repository.

---

**Built with ❤️ using NestJS and Next.js**