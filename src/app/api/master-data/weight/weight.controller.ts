import { WeightService } from './weight.service';
import type { Weight } from '@/../prisma-client';

type PaginatedResponse = {
  data: Weight[];
  total: number;
};

export class WeightController {
  private service: WeightService;

  constructor() {
    this.service = new WeightService();
  }

  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<Weight | null> {
    return this.service.findById(id);
  }

  async create(data: Omit<Weight, 'DataID'>): Promise<Weight> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Weight>): Promise<Weight> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Weight> {
    return this.service.delete(id);
  }
}

export const controller = new WeightController();
