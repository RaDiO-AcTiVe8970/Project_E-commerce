import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
