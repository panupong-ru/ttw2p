import { ProductService } from './product.service';
import type { Product } from '@/../prisma-client';

type PaginatedResponse = {
  data: Product[];
  total: number;
};

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async find(filters: Record<string, string>, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse> {
    const adjustedPage = page;
    return this.service.find(filters, adjustedPage, pageSize);
  }

  async create(data: Omit<Product, 'DataID'>): Promise<Product> {
    return this.service.create(data);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.service.update(id, data);
  }

  async delete(id: string): Promise<Product> {
    return this.service.delete(id);
  }
}
