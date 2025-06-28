import { WeightUnitService } from './weight-unit.service';
import type { WeightUnit } from '@/../prisma-client';

type PaginatedResponse = {
  data: WeightUnit[];
  total: number;
};

export class WeightUnitController {
  private service: WeightUnitService;

  constructor() {
    this.service = new WeightUnitService();
  }

  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<WeightUnit | null> {
    return this.service.findById(id);
  }

  async create(data: Omit<WeightUnit, 'DataID'>): Promise<WeightUnit> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<WeightUnit>): Promise<WeightUnit> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<WeightUnit> {
    return this.service.delete(id);
  }
}
