import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
export declare class ShopsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
        _count: {
            products: number;
        };
    } & {
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
    })[]>;
    create(userId: string, createShopDto: CreateShopDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
    } & {
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
    }>;
    findOne(id: string): Promise<{
        products: {
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
        }[];
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
        };
        _count: {
            products: number;
        };
    } & {
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
    }>;
    findByUserId(userId: string): Promise<{
        products: {
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
        }[];
        _count: {
            products: number;
        };
    } & {
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
    }>;
    verify(id: string): Promise<{
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
    }>;
}
