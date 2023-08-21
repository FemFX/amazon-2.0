import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PrismaService } from 'src/prisma.service';
import { productReturnObject } from 'src/product/return-product.object';
import * as YooKassa from 'yookassa';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { EnumOrderStatus } from '@prisma/client';

const yooKassa = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey: process.env['PAYMENT_TOKEN'],
});

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
      },
    });
  }

  async getByUserId(userId: number) {
    return this.prismaService.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
      },
    });
  }
  async placeOrder(dto: OrderDto, userId: number) {
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const items = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      productId: item.productId,
    }));

    const order = await this.prismaService.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const payment = await yooKassa.createPayment({
      amount: { value: total, currency: 'RUB' },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/thanks',
      },
      description: `Order #${order.id}`,
    });

    return payment;
  }

  //ngrok
  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const payment = await yooKassa.capturePayment(dto.object.id);

      return payment;
    }

    if (dto.event === 'payment.succeeded') {
      const orderId = Number(dto.object.description.split('#')[1]);
      // const order = await this.prismaService.order.update({
      //   where: {
      //     id: dto.object.metadata.order_id,
      //   },
      //   data: {
      //     status: 'PAYED',
      //   },
      // });
      await this.prismaService.order.update({
        where: {
          id: orderId,
        },
        data: { status: EnumOrderStatus.PAYED },
      });

      return true;
    }

    return true;
  }
}
