import { WeightTypeService } from './weight-type.service';
import type { WeightType } from '@/../prisma-client';

type PaginatedResponse = {
  data: WeightType[];
  total: number;
};

export class WeightTypeController {
  private service: WeightTypeService;
  constructor() {
    this.service = new WeightTypeService();
  }
  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<WeightType | null> {
    return this.service.findById(id);
  }

  async create(data: Omit<WeightType, 'DataID'>): Promise<WeightType> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<WeightType>): Promise<WeightType> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<WeightType> {
    return this.service.delete(id);
  }
}

export const controller = new WeightTypeController();
