import { WeightTypeService } from './weight-type.service';
import type { WeightType } from '@prisma/client';

export class WeightTypeController {
  private service: WeightTypeService;

  constructor() {
    this.service = new WeightTypeService();
  }

  async getAll(): Promise<WeightType[]> {
    return this.service.findAll();
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
