import { prisma } from '@/core/libs/prisma';
import type { Driver } from '@/../prisma-client';

export class DriverService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Driver[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.driver.findMany({
        skip,
        take: pageSize,
        orderBy: {
          DriverID: 'asc',
        },
      }),
      prisma.driver.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Driver | null> {
    return prisma.driver.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: Omit<Driver, 'DataID'>): Promise<Driver> {
    return prisma.driver.create({
      data: {
        DataID: data.DriverID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<Driver>): Promise<Driver> {
    return prisma.driver.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Driver> {
    return prisma.driver.delete({
      where: { DataID: id },
    });
  }
}
