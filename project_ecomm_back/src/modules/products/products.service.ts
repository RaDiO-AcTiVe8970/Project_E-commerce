import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface FindAllOptions {
  categorySlug?: string;
  shopId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(options: FindAllOptions = {}) {
    const { categorySlug, shopId, search, page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (shopId) {
      where.shopId = shopId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          shop: {
            select: {
              id: true,
              name: true,
              logo: true,
              isVerified: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            isVerified: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async getSellerProducts(userId: string) {
    // Get seller's shop
    const shop = await this.prisma.shop.findUnique({
      where: { userId },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    // Get all products for this shop
    const products = await this.prisma.product.findMany({
      where: { shopId: shop.id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            orderItems: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products;
  }

  async getSellerAnalytics(userId: string) {
    // Get seller's shop
    const shop = await this.prisma.shop.findUnique({
      where: { userId },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    // Get product count
    const totalProducts = await this.prisma.product.count({
      where: { shopId: shop.id },
    });

    // Get active products count
    const activeProducts = await this.prisma.product.count({
      where: { shopId: shop.id, isActive: true },
    });

    // Get total orders and revenue
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        product: {
          shopId: shop.id,
        },
      },
      include: {
        product: true,
      },
    });

    const totalOrders = orderItems.length;
    const totalRevenue = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Get low stock products (inventory < 10)
    const lowStockCount = await this.prisma.product.count({
      where: {
        shopId: shop.id,
        inventory: { lt: 10 },
        isActive: true,
      },
    });

    // Get total reviews count
    const totalReviews = await this.prisma.review.count({
      where: {
        product: {
          shopId: shop.id,
        },
      },
    });

    return {
      shop: {
        id: shop.id,
        name: shop.name,
        isVerified: shop.isVerified,
      },
      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        totalRevenue,
        lowStockCount,
        totalReviews,
      },
    };
  }

  async create(userId: string, createProductDto: CreateProductDto) {
    // Get seller's shop
    const shop = await this.prisma.shop.findUnique({
      where: { userId },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found for this user');
    }

    const product = await this.prisma.product.create({
      data: {
        shopId: shop.id,
        title: createProductDto.title,
        description: createProductDto.description,
        price: createProductDto.price,
        inventory: createProductDto.inventory,
        categoryId: createProductDto.categoryId,
        images: createProductDto.images || [],
        isActive: createProductDto.isActive !== undefined ? createProductDto.isActive : true,
      },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return product;
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { shop: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Check if user owns this product
    if (product.shop.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this product');
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            logo: true,
            isVerified: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return updatedProduct;
  }

  async remove(id: string, userId: string) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { shop: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Check if user owns this product
    if (product.shop.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this product');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }
}
