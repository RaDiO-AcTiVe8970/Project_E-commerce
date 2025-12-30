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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ShopsService = class ShopsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async create(userId, createShopDto) {
        const existingShop = await this.prisma.shop.findUnique({
            where: { userId },
        });
        if (existingShop) {
            throw new common_1.BadRequestException('User already has a shop');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { role: 'SELLER' },
        });
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Shop with ID "${id}" not found`);
        }
        return shop;
    }
    async findByUserId(userId) {
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
            throw new common_1.NotFoundException(`Shop not found for user "${userId}"`);
        }
        return shop;
    }
    async verify(id) {
        const shop = await this.prisma.shop.findUnique({
            where: { id },
        });
        if (!shop) {
            throw new common_1.NotFoundException(`Shop with ID "${id}" not found`);
        }
        return this.prisma.shop.update({
            where: { id },
            data: { isVerified: true },
        });
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopsService);
//# sourceMappingURL=shops.service.js.map