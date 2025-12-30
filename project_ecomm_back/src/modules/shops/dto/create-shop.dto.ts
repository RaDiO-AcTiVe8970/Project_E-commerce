import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({ example: 'My Awesome Shop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'We sell the best products' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'Electronics' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'https://myshop.com' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ example: '+1 (555) 123-4567' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: '123 Main St, City, State 12345' })
  @IsOptional()
  @IsString()
  businessAddress?: string;
}
