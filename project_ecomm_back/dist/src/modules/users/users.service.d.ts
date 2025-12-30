import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            firstName: string | null;
            lastName: string | null;
            avatar: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        shop: {
            id: string;
            name: string;
            description: string | null;
        } | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
