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

  async getAll(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.findAll(adjustedPage, pageSize);
  }

  async getById(id: string): Promise<RFIDTag | null> {
    return this.service.findById(id);
  }

  async create(data: Omit<RFIDTag, 'DataID'>): Promise<RFIDTag> {
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
