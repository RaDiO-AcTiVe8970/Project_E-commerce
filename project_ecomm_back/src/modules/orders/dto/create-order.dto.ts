import { IsEnum, IsNotEmpty, IsNumber, IsObject, Min } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  commission: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;

  @IsNotEmpty()
  @IsObject()
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}
