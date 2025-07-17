import { prisma } from '@/core/libs/prisma';
import type { Customer } from '@/../prisma-client';

export class CustomerService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: Customer[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          CustomerID: 'asc',
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return { data, total };
  }

  private buildWhereClause(filters: Record<string, string>): any {
    const where: any = {};

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (key.endsWith('ID')) {
          where[key] = value;
        } else {
          where[key] = {
            contains: value,
          };
        }
      }
    }
    return where;
  }

  async create(data: Omit<Customer, 'DataID'>): Promise<Customer> {
    return prisma.customer.create({
      data: {
        DataID: data.CustomerID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    return prisma.customer.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Customer> {
    return prisma.customer.delete({
      where: { DataID: id },
    });
  }
}
