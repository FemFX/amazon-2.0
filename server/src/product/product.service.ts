import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  productReturnFullObject,
  productReturnObject,
} from './return-product.object';
import { ProductDto } from './dto/product.dto';
import { slugify } from 'src/utils/generate-slug';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}
  async getAll(dto: GetAllProductDto) {
    const { sort, searchTerm } = dto;
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' });
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({ createdAt: 'asc' });
    } else {
      prismaSort.push({ createdAt: 'desc' });
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                },
              },
              name: {
                contains: searchTerm,
              },
              description: {
                contains: searchTerm,
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prismaService.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: productReturnFullObject,
    });

    return {
      products,
      length: await this.prismaService.product.count({
        where: prismaSearchTermFilter,
      }),
    };
  }
  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: productReturnFullObject,
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }
  async getProductBySlug(slug: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug,
      },
      select: productReturnObject,
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }
  async getProductByCategory(categorySlug: string) {
    const product = await this.prismaService.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: productReturnObject,
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }
  async getSimilar(id: number) {
    const currentProduct = await this.getProductById(id);
    if (!currentProduct) throw new NotFoundException('product not found');
    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productReturnFullObject,
    });
    return products;
  }
  async update(id: number, dto: ProductDto) {
    const { description, categoryId, image, name, price } = dto;
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        description,
        image,
        name,
        price,
        slug: slugify(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }
  async create() {
    const product = await this.prismaService.product.create({
      data: {
        description: '',
        name: '',
        slug: '',
        price: 0,
        image: '',
      },
    });
    return product.id;
  }
  async delete(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
