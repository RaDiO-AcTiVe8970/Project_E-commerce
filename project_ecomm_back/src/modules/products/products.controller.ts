import { Controller, Get, Post, Put, Delete, Query, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiQuery({ name: 'categorySlug', required: false, type: String })
  @ApiQuery({ name: 'shopId', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  findAll(
    @Query('categorySlug') categorySlug?: string,
    @Query('shopId') shopId?: string,
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.productsService.findAll({
      categorySlug,
      shopId,
      search,
      page,
      limit,
    });
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get seller\'s own products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  getMyProducts(@CurrentUser('id') userId: string) {
    return this.productsService.getSellerProducts(userId);
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get seller\'s analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  getAnalytics(@CurrentUser('id') userId: string) {
    return this.productsService.getSellerAnalytics(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  create(
    @CurrentUser('id') userId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(userId, createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, userId, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.remove(id, userId);
  }
}
