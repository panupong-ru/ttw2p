import { prisma } from '@/core/libs/prisma';
import type { Driver } from '@/../prisma-client';

export class DriverService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: Driver[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.driver.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          DriverID: 'asc',
        },
      }),
      prisma.driver.count({ where }),
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
