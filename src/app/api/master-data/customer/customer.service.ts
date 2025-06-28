import { prisma } from '@/core/libs/prisma';
import type { Customer } from '@/../prisma-client';

export class CustomerService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Customer[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.customer.findMany({
        skip,
        take: pageSize,
        orderBy: {
          CustomerID: 'asc',
        },
      }),
      prisma.customer.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { DataID: id },
    });
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
