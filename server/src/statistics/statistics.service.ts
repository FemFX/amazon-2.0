import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getMain() {
    const ordersCount = await this.prismaService.order.count();
    const reviewsCount = await this.prismaService.review.count();
    const usersCount = await this.prismaService.user.count();

    const totalAmount = await this.prismaService.order.aggregate({
      _sum: {
        total: true,
      },
    });

    return [
      {
        name: 'orders',
        value: ordersCount,
      },
      {
        name: 'reviews',
        value: reviewsCount,
      },
      {
        name: 'users',
        value: usersCount,
      },
      {
        name: 'total amount',
        value: totalAmount,
      },
    ];
  }
}
