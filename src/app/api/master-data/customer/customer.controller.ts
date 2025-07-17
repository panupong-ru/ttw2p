import { CustomerService } from './customer.service';
import type { Customer } from '@/../prisma-client';

type PaginatedResponse = {
  data: Customer[];
  total: number;
};

export class CustomerController {
  private service: CustomerService;

  constructor() {
    this.service = new CustomerService();
  }

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
  }

  async create(data: Omit<Customer, 'DataID'>): Promise<Customer> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Customer> {
    return this.service.delete(id);
  }
}
