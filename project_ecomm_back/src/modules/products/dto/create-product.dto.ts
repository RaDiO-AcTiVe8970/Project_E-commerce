import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Bluetooth Headphones' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Premium noise-cancelling headphones' })
  @IsString()
  description: string;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  inventory: number;

  @ApiProperty({ example: 'category-id-here' })
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({ example: ['https://example.com/image1.jpg'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
