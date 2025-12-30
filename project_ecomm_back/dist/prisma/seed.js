"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting database seeding...');
    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Home & Garden', slug: 'home & garden' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Books', slug: 'books' },
        { name: 'Toys', slug: 'toys' },
        { name: 'Beauty', slug: 'beauty' },
        { name: 'Jewelry', slug: 'jewelry' },
    ];
    console.log('Creating categories...');
    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@ecommerce.com' },
        update: {},
        create: {
            email: 'admin@ecommerce.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
        },
    });
    console.log('Creating seller user and shop...');
    const sellerPassword = await bcrypt.hash('seller123', 10);
    const seller = await prisma.user.upsert({
        where: { email: 'seller@ecommerce.com' },
        update: {},
        create: {
            email: 'seller@ecommerce.com',
            password: sellerPassword,
            firstName: 'John',
            lastName: 'Seller',
            role: 'SELLER',
        },
    });
    const shop = await prisma.shop.upsert({
        where: { userId: seller.id },
        update: {},
        create: {
            userId: seller.id,
            name: 'Tech Paradise',
            description: 'Your one-stop shop for all tech gadgets and accessories',
            isVerified: true,
        },
    });
    const electronicsCategory = await prisma.category.findUnique({
        where: { slug: 'electronics' },
    });
    const fashionCategory = await prisma.category.findUnique({
        where: { slug: 'fashion' },
    });
    const homeCategory = await prisma.category.findUnique({
        where: { slug: 'home & garden' },
    });
    console.log('Creating sample products...');
    const products = [
        {
            shopId: shop.id,
            categoryId: electronicsCategory.id,
            title: 'Wireless Bluetooth Headphones',
            description: 'Premium noise-cancelling headphones with 30-hour battery life',
            price: 89.99,
            inventory: 50,
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: electronicsCategory.id,
            title: 'Smart Watch Pro',
            description: 'Feature-packed smartwatch with fitness tracking and heart rate monitor',
            price: 199.99,
            inventory: 30,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: electronicsCategory.id,
            title: 'Portable Bluetooth Speaker',
            description: 'Waterproof speaker with 360-degree sound and 20-hour battery',
            price: 49.99,
            inventory: 100,
            images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: fashionCategory.id,
            title: 'Premium Leather Backpack',
            description: 'Stylish and durable leather backpack perfect for work or travel',
            price: 129.99,
            inventory: 25,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: fashionCategory.id,
            title: 'Designer Sunglasses',
            description: 'UV-protected polarized sunglasses with premium frames',
            price: 79.99,
            inventory: 60,
            images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: homeCategory.id,
            title: 'Smart Home Security Camera',
            description: '1080p HD camera with night vision and motion detection',
            price: 99.99,
            inventory: 40,
            images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: homeCategory.id,
            title: 'Robot Vacuum Cleaner',
            description: 'Automatic vacuum with app control and smart navigation',
            price: 299.99,
            inventory: 15,
            images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
        },
        {
            shopId: shop.id,
            categoryId: electronicsCategory.id,
            title: 'Wireless Gaming Mouse',
            description: 'High-precision gaming mouse with RGB lighting and programmable buttons',
            price: 59.99,
            inventory: 75,
            images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
        },
    ];
    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }
    console.log('Database seeding completed successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@ecommerce.com / admin123');
    console.log('Seller: seller@ecommerce.com / seller123');
}
main()
    .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map