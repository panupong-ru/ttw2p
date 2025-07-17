import { RFIDTagService } from './rfid-tag.service';
import type { RFIDTag } from '@/../prisma-client';

type PaginatedResponse = {
  data: RFIDTag[];
  total: number;
};

export class RFIDTagController {
  private service: RFIDTagService;

  constructor() {
    this.service = new RFIDTagService();
  }

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
  }

  async create(data: RFIDTag): Promise<RFIDTag> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<RFIDTag>): Promise<RFIDTag> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<RFIDTag> {
    return this.service.delete(id);
  }
}

export const controller = new RFIDTagController();
