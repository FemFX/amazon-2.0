import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth('admin')
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Auth()
  @Get('by-user')
  async getByUserId(@CurrentUser('id') id: number) {
    return this.orderService.getByUserId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async placeOrder(@CurrentUser('id') userId: number, @Body() dto: OrderDto) {
    return this.orderService.placeOrder(dto, userId);
  }
  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
