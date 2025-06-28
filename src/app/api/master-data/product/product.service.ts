import { prisma } from '@/core/libs/prisma';
import type { Product } from '@/../prisma-client';

export class ProductService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: {
          ProductID: 'asc',
        },
      }),
      prisma.product.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: Omit<Product, 'DataID'>): Promise<Product> {
    return prisma.product.create({
      data: {
        DataID: data.ProductID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return prisma.product.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({
      where: { DataID: id },
    });
  }
}
