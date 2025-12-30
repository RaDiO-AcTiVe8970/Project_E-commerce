import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        updatedAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
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
