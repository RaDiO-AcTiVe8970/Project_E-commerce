import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
        data: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        shop: {
            description: string | null;
            id: string;
            name: string;
        } | null;
        email: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
