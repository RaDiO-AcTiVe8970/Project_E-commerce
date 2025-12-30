"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(options = {}) {
        const { categorySlug, shopId, search, page = 1, limit = 20 } = options;
        const skip = (page - 1) * limit;
        const where = {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }
    async getSellerProducts(userId) {
        const shop = await this.prisma.shop.findUnique({
            where: { userId },
        });
        if (!shop) {
            throw new common_1.NotFoundException('Shop not found for this user');
        }
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
    async getSellerAnalytics(userId) {
        const shop = await this.prisma.shop.findUnique({
            where: { userId },
        });
        if (!shop) {
            throw new common_1.NotFoundException('Shop not found for this user');
        }
        const totalProducts = await this.prisma.product.count({
            where: { shopId: shop.id },
        });
        const activeProducts = await this.prisma.product.count({
            where: { shopId: shop.id, isActive: true },
        });
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
        const lowStockCount = await this.prisma.product.count({
            where: {
                shopId: shop.id,
                inventory: { lt: 10 },
                isActive: true,
            },
        });
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
    async create(userId, createProductDto) {
        const shop = await this.prisma.shop.findUnique({
            where: { userId },
        });
        if (!shop) {
            throw new common_1.NotFoundException('Shop not found for this user');
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
    async update(id, userId, updateProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { shop: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        if (product.shop.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this product');
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
    async remove(id, userId) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { shop: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        if (product.shop.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to delete this product');
        }
        await this.prisma.product.delete({
            where: { id },
        });
        return { message: 'Product deleted successfully' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map