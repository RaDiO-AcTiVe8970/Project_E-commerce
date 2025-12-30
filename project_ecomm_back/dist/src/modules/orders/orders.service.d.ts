import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createOrderDto: CreateOrderDto, cartItems: any[]): Promise<{
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                shop: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    description: string | null;
                    logo: string | null;
                    commissionRate: number;
                    stripeAccountId: string | null;
                    isVerified: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                price: number;
                inventory: number;
                images: string[];
                isActive: boolean;
                shopId: string;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            commission: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        commission: number;
        subtotal: number;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    findUserOrders(userId: string): Promise<({
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                shop: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    description: string | null;
                    logo: string | null;
                    commissionRate: number;
                    stripeAccountId: string | null;
                    isVerified: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                price: number;
                inventory: number;
                images: string[];
                isActive: boolean;
                shopId: string;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            commission: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        commission: number;
        subtotal: number;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                shop: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    description: string | null;
                    logo: string | null;
                    commissionRate: number;
                    stripeAccountId: string | null;
                    isVerified: boolean;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                price: number;
                inventory: number;
                images: string[];
                isActive: boolean;
                shopId: string;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            commission: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        commission: number;
        subtotal: number;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    getUserStats(userId: string): Promise<{
        orders: number;
        spent: number;
        wishlist: number;
        reviews: number;
    }>;
    updateStatus(id: string, status: OrderStatus): Promise<{
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                title: string;
                price: number;
                inventory: number;
                images: string[];
                isActive: boolean;
                shopId: string;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            commission: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        commission: number;
        subtotal: number;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
}
