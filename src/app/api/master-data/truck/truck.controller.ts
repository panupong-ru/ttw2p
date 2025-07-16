import { TruckService } from './truck.service';
import type { Truck } from '@/../prisma-client';

type PaginatedResponse = {
  data: Truck[];
  total: number;
};

export class TruckController {
  private service: TruckService;

  constructor() {
    this.service = new TruckService();
  }

  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<Truck | null> {
    return this.service.findById(id);
  }

  async create(data: Omit<Truck, 'DataID'>): Promise<Truck> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Truck>): Promise<Truck> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Truck> {
    return this.service.delete(id);
  }
}

export const controller = new TruckController();
