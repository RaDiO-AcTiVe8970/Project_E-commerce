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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addItem(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                shop: true,
                category: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (!product.isActive) {
            throw new common_1.BadRequestException('This product is not available');
        }
        if (product.inventory < quantity) {
            throw new common_1.BadRequestException(`Insufficient inventory. Available: ${product.inventory}, Requested: ${quantity}`);
        }
        const existingItem = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (product.inventory < newQuantity) {
                throw new common_1.BadRequestException(`Cannot add more items. Maximum available: ${product.inventory}`);
            }
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
                include: {
                    product: {
                        include: {
                            shop: true,
                            category: true,
                        },
                    },
                },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                userId,
                productId,
                quantity,
            },
            include: {
                product: {
                    include: {
                        shop: true,
                        category: true,
                    },
                },
            },
        });
    }
    async getCart(userId) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    include: {
                        shop: true,
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        return {
            items: cartItems,
            subtotal,
            itemCount,
        };
    }
    async updateQuantity(userId, itemId, updateDto) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { product: true },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (cartItem.userId !== userId) {
            throw new common_1.BadRequestException('You can only update your own cart items');
        }
        if (cartItem.product.inventory < updateDto.quantity) {
            throw new common_1.BadRequestException(`Insufficient inventory. Available: ${cartItem.product.inventory}`);
        }
        return this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity: updateDto.quantity },
            include: {
                product: {
                    include: {
                        shop: true,
                        category: true,
                    },
                },
            },
        });
    }
    async removeItem(userId, itemId) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id: itemId },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (cartItem.userId !== userId) {
            throw new common_1.BadRequestException('You can only remove your own cart items');
        }
        await this.prisma.cartItem.delete({
            where: { id: itemId },
        });
        return { message: 'Item removed from cart' };
    }
    async clearCart(userId) {
        await this.prisma.cartItem.deleteMany({
            where: { userId },
        });
        return { message: 'Cart cleared successfully' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map