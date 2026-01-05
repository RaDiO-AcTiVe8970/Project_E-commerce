import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto, cartItems: any[]) {
    // Validate all products exist
    const productIds = createOrderDto.cartItems.map(item => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      throw new BadRequestException(
        `The following product IDs do not exist: ${missingIds.join(', ')}. Please remove them from your cart and try again.`
      );
    }

    // Check inventory
    for (const item of createOrderDto.cartItems) {
      const product = products.find(p => p.id === item.productId);
      if (product && product.inventory < item.quantity) {
        throw new BadRequestException(
          `Insufficient inventory for product "${product.title}". Available: ${product.inventory}, Requested: ${item.quantity}`
        );
      }
    }

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        userId,
        subtotal: createOrderDto.subtotal,
        commission: createOrderDto.commission,
        total: createOrderDto.total,
        shippingAddress: createOrderDto.shippingAddress,
        status: OrderStatus.PENDING,
        items: {
          create: createOrderDto.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            commission: item.price * 0.1, // 10% commission
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                shop: true,
                category: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async findUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                shop: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                shop: true,
                category: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if user owns the order (or is admin)
    if (order.userId !== userId) {
      throw new ForbiddenException('You do not have permission to view this order');
    }

    return order;
  }

  async getUserStats(userId: string) {
    // Get total orders
    const totalOrders = await this.prisma.order.count({
      where: { userId },
    });

    // Get total spent
    const orders = await this.prisma.order.findMany({
      where: { 
        userId,
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED],
        },
      },
      select: { total: true },
    });

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    // Get wishlist count (you'll need to implement wishlist feature)
    // For now, returning 0
    const wishlistCount = 0;

    // Get reviews count
    const reviewsCount = await this.prisma.review.count({
      where: { userId },
    });

    return {
      orders: totalOrders,
      spent: totalSpent,
      wishlist: wishlistCount,
      reviews: reviewsCount,
    };
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
