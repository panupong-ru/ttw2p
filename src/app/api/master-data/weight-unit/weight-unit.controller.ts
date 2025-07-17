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

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
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
