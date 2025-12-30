import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @CurrentUser('id') userId: string,
    @Body() createOrderDto: CreateOrderDto,
    @Body('cartItems') cartItems: any[],
  ) {
    return this.ordersService.create(userId, createOrderDto, cartItems);
  }

  @Get('my-orders')
  findMyOrders(@CurrentUser('id') userId: string) {
    return this.ordersService.findUserOrders(userId);
  }

  @Get('stats')
  getUserStats(@CurrentUser('id') userId: string) {
    return this.ordersService.getUserStats(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.ordersService.findOne(id, userId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}
