declare class AddressDto {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    address?: AddressDto;
}
export {};
