import { Injectable, NotFoundException } from '@nestjs/common';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './dto/category.dto';
import { slugify } from 'src/utils/generate-slug';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.category.findMany({
      select: returnCategoryObject,
    });
  }
  async byId(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  async bySlug(slug: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObject,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  async update(id: number, dto: CategoryDto) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: slugify(dto.name),
      },
    });
  }
  async delete(id: number) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
  async create() {
    return this.prismaService.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
  }
}
