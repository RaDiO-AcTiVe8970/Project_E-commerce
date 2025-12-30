export declare class CreateOrderDto {
    subtotal: number;
    commission: number;
    total: number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}
