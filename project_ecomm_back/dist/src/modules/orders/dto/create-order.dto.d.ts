declare class CartItemDto {
    productId: string;
    quantity: number;
    price: number;
}
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
    cartItems: CartItemDto[];
}
export {};
