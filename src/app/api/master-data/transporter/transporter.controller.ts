import { TransporterService } from './transporter.service';
import type { Transporter } from '@/../prisma-client';

type PaginatedResponse = {
  data: Transporter[];
  total: number;
};

export class TransporterController {
  private service: TransporterService;

  constructor() {
    this.service = new TransporterService();
  }

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
  }

  async create(data: Omit<Transporter, 'DataID'>): Promise<Transporter> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Transporter>): Promise<Transporter> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Transporter> {
    return this.service.delete(id);
  }
}
