import { DriverService } from './driver.service';
import type { Driver } from '@/../prisma-client';

type PaginatedResponse = {
  data: Driver[];
  total: number;
};

export class DriverController {
  private service: DriverService;

  constructor() {
    this.service = new DriverService();
  }

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
  }

  async create(data: Omit<Driver, 'DataID'>): Promise<Driver> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Driver>): Promise<Driver> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Driver> {
    return this.service.delete(id);
  }
}
