import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create categories
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

  // Create admin user
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

  // Create a seller user with shop
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

  // Get categories for products
  const electronicsCategory = await prisma.category.findUnique({
    where: { slug: 'electronics' },
  });
  const fashionCategory = await prisma.category.findUnique({
    where: { slug: 'fashion' },
  });
  const homeCategory = await prisma.category.findUnique({
    where: { slug: 'home & garden' },
  });

  // Create sample products
  console.log('Creating sample products...');
  const products = [
    {
      shopId: shop.id,
      categoryId: electronicsCategory!.id,
      title: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling headphones with 30-hour battery life',
      price: 89.99,
      inventory: 50,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: electronicsCategory!.id,
      title: 'Smart Watch Pro',
      description: 'Feature-packed smartwatch with fitness tracking and heart rate monitor',
      price: 199.99,
      inventory: 30,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: electronicsCategory!.id,
      title: 'Portable Bluetooth Speaker',
      description: 'Waterproof speaker with 360-degree sound and 20-hour battery',
      price: 49.99,
      inventory: 100,
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: fashionCategory!.id,
      title: 'Premium Leather Backpack',
      description: 'Stylish and durable leather backpack perfect for work or travel',
      price: 129.99,
      inventory: 25,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: fashionCategory!.id,
      title: 'Designer Sunglasses',
      description: 'UV-protected polarized sunglasses with premium frames',
      price: 79.99,
      inventory: 60,
      images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: homeCategory!.id,
      title: 'Smart Home Security Camera',
      description: '1080p HD camera with night vision and motion detection',
      price: 99.99,
      inventory: 40,
      images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: homeCategory!.id,
      title: 'Robot Vacuum Cleaner',
      description: 'Automatic vacuum with app control and smart navigation',
      price: 299.99,
      inventory: 15,
      images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
    },
    {
      shopId: shop.id,
      categoryId: electronicsCategory!.id,
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
