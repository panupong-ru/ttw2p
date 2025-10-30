import { prisma } from '@/core/libs/prisma';
import type { Transporter } from '@/../prisma-client';
import { getHWID } from '@/core/utils/hardware';

export class TransporterService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: Transporter[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.transporter.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          TransporterID: 'asc',
        },
      }),
      prisma.transporter.count({ where }),
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

  async create(data: Omit<Transporter, 'DataID'>): Promise<Transporter> {
    return prisma.transporter.create({
      data: {
        DataID: data.TransporterID || crypto.randomUUID(),
        ...data,
        HWID: getHWID(),
      },
    });
  }

  async update(id: string, data: Partial<Transporter>): Promise<Transporter> {
    return prisma.transporter.update({
      where: { DataID: id },
      data: {
        ...data,
        HWID: getHWID(),
      },
    });
  }

  async delete(id: string): Promise<Transporter> {
    return prisma.transporter.delete({
      where: { DataID: id },
    });
  }
}
