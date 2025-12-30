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
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(options?: FindAllOptions): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
                slug: string;
            };
            shop: {
                id: string;
                name: string;
                logo: string | null;
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        shop: {
            id: string;
            name: string;
            description: string | null;
            logo: string | null;
            isVerified: boolean;
        };
        reviews: ({
            user: {
                id: string;
                firstName: string | null;
                lastName: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
            rating: number;
            comment: string | null;
        })[];
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
    }>;
    getSellerProducts(userId: string): Promise<({
        category: {
            id: string;
            name: string;
            slug: string;
        };
        _count: {
            reviews: number;
            orderItems: number;
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
    })[]>;
    getSellerAnalytics(userId: string): Promise<{
        shop: {
            id: string;
            name: string;
            isVerified: boolean;
        };
        stats: {
            totalProducts: number;
            activeProducts: number;
            totalOrders: number;
            totalRevenue: number;
            lowStockCount: number;
            totalReviews: number;
        };
    }>;
    create(userId: string, createProductDto: CreateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        shop: {
            id: string;
            name: string;
            logo: string | null;
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
    }>;
    update(id: string, userId: string, updateProductDto: UpdateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        };
        shop: {
            id: string;
            name: string;
            logo: string | null;
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
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
export {};
