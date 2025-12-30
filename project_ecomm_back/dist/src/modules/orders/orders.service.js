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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOrderDto, cartItems) {
        const order = await this.prisma.order.create({
            data: {
                userId,
                subtotal: createOrderDto.subtotal,
                commission: createOrderDto.commission,
                total: createOrderDto.total,
                shippingAddress: createOrderDto.shippingAddress,
                status: client_1.OrderStatus.PENDING,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        commission: item.price * 0.1,
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
    async findUserOrders(userId) {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view this order');
        }
        return order;
    }
    async getUserStats(userId) {
        const totalOrders = await this.prisma.order.count({
            where: { userId },
        });
        const orders = await this.prisma.order.findMany({
            where: {
                userId,
                status: {
                    in: [client_1.OrderStatus.PAID, client_1.OrderStatus.PROCESSING, client_1.OrderStatus.SHIPPED, client_1.OrderStatus.DELIVERED],
                },
            },
            select: { total: true },
        });
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const wishlistCount = 0;
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
    async updateStatus(id, status) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map