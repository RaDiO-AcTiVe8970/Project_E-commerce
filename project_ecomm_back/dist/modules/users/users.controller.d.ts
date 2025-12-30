import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
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
