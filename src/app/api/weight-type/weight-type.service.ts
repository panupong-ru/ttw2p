import { prisma } from '@/core/libs/prisma';
import type { WeightType } from '@prisma/client';

export class WeightTypeService {
  async findAll(): Promise<WeightType[]> {
    return prisma.weightType.findMany();
  }

  async findById(id: string): Promise<WeightType | null> {
    return prisma.weightType.findUnique({
      where: { WeightTypeID: id },
    });
  }

  async create(data: Omit<WeightType, 'DataID'>): Promise<WeightType> {
    return prisma.weightType.create({
      data: {
        DataID: crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<WeightType>): Promise<WeightType> {
    return prisma.weightType.update({
      where: { WeightTypeID: id },
      data,
    });
  }

  async delete(id: string): Promise<WeightType> {
    return prisma.weightType.delete({
      where: { WeightTypeID: id },
    });
  }
}
