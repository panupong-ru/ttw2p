import { prisma } from '@/core/libs/prisma';
import type { WeightUnit } from '@/../prisma-client';

export class WeightUnitService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: WeightUnit[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.weightUnit.findMany({
        skip,
        take: pageSize,
        orderBy: {
          WeightUnitID: 'asc',
        },
      }),
      prisma.weightUnit.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<WeightUnit | null> {
    return prisma.weightUnit.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: Omit<WeightUnit, 'DataID'>): Promise<WeightUnit> {
    return prisma.weightUnit.create({
      data: {
        DataID: data.WeightUnitID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<WeightUnit>): Promise<WeightUnit> {
    return prisma.weightUnit.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<WeightUnit> {
    return prisma.weightUnit.delete({
      where: { DataID: id },
    });
  }
}
