import { prisma } from '@/core/libs/prisma';
import type { Product } from '@/../prisma-client';

export class ProductService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          ProductID: 'asc',
        },
      }),
      prisma.product.count({ where }),
    ]);

    return { data, total };
  }

  private buildWhereClause(filters: Record<string, string>): any {
    const where: any = {};
    const numberFields = ['Price'];

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (key.endsWith('ID')) {
          where[key] = value;
        } else if (numberFields.includes(key)) {
          where[key] = parseFloat(value);
        } else {
          where[key] = {
            contains: value,
          };
        }
      }
    }
    return where;
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
