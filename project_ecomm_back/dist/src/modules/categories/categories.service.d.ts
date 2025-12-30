import { PrismaService } from '../../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            products: number;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findBySlug(slug: string): Promise<{
        _count: {
            products: number;
        };
    } & {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
