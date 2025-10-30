import { prisma } from '@/core/libs/prisma';
import type { WeightUnit } from '@/../prisma-client';
import { getHWID } from '@/core/utils/hardware';

export class WeightUnitService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: WeightUnit[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.weightUnit.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          WeightUnitID: 'asc',
        },
      }),
      prisma.weightUnit.count({ where }),
    ]);

    return { data, total };
  }

  private buildWhereClause(filters: Record<string, string>): any {
    const where: any = {};
    const numberFields = ['KgToUnit'];

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

  async create(data: Omit<WeightUnit, 'DataID'>): Promise<WeightUnit> {
    return prisma.weightUnit.create({
      data: {
        DataID: data.WeightUnitID || crypto.randomUUID(),
        ...data,
        HWID: getHWID(),
      },
    });
  }

  async update(id: string, data: Partial<WeightUnit>): Promise<WeightUnit> {
    return prisma.weightUnit.update({
      where: { DataID: id },
      data: {
        ...data,
        HWID: getHWID(),
      },
    });
  }

  async delete(id: string): Promise<WeightUnit> {
    return prisma.weightUnit.delete({
      where: { DataID: id },
    });
  }
}
