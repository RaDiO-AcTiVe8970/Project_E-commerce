import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.shop.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, createShopDto: CreateShopDto) {
    // Check if user already has a shop
    const existingShop = await this.prisma.shop.findUnique({
      where: { userId },
    });

    if (existingShop) {
      throw new BadRequestException('User already has a shop');
    }

    // Update user role to SELLER
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'SELLER' },
    });

    // Create the shop
    const shop = await this.prisma.shop.create({
      data: {
        userId,
        name: createShopDto.name,
        description: createShopDto.description,
        logo: createShopDto.logo,
      },
      include: {
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

    return shop;
  }

  async findOne(id: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        products: {
          where: { isActive: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID "${id}" not found`);
    }

    return shop;
  }

  async findByUserId(userId: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { userId },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException(`Shop not found for user "${userId}"`);
    }

    return shop;
  }

  async verify(id: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID "${id}" not found`);
    }

    return this.prisma.shop.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}
