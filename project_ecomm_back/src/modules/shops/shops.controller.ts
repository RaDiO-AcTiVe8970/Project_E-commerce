import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all shops (Admin only)' })
  @ApiResponse({ status: 200, description: 'Shops retrieved successfully' })
  findAll() {
    return this.shopsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a shop (become a seller)' })
  @ApiResponse({ status: 201, description: 'Shop created successfully' })
  @ApiResponse({ status: 400, description: 'User already has a shop' })
  create(
    @CurrentUser('id') userId: string,
    @Body() createShopDto: CreateShopDto,
  ) {
    return this.shopsService.create(userId, createShopDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiResponse({ status: 200, description: 'Shop found' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get shop by user ID' })
  @ApiResponse({ status: 200, description: 'Shop found' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  findByUserId(@Param('userId') userId: string) {
    return this.shopsService.findByUserId(userId);
  }

  @Patch(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify a shop (Admin only)' })
  @ApiResponse({ status: 200, description: 'Shop verified successfully' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  verify(@Param('id') id: string) {
    return this.shopsService.verify(id);
  }
}
