import type { NextRequest } from 'next/server';
import { ProductController } from './product.controller';
import { errorResponse, successResponse } from '@/core/utils/api-response';
import type { Product } from '@/../prisma-client';

const controller = new ProductController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;

    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'pageSize') {
        filters[key] = value;
      }
    });

    const result = await controller.find(filters, page, pageSize);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string | number | null> = {};

    for (const [key, value] of formData.entries()) {
      // Convert Price to number if provided
      if (key === 'Price' && value) {
        data[key] = parseFloat(value as string);
      } else if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const product = await controller.create(data as Omit<Product, 'DataID'>);
    return successResponse(product, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
      return errorResponse('ID is required', 400);
    }

    const formData = await request.formData();
    const data: Record<string, string | number | null> = {};
    for (const [key, value] of formData.entries()) {
      // Convert Price to number if provided
      if (key === 'Price' && value) {
        data[key] = parseFloat(value as string);
      } else if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const product = await controller.update(id, data);
    return successResponse(product);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
      return errorResponse('ID is required', 400);
    }

    await controller.delete(id);
    return successResponse(null);
  } catch (error) {
    return errorResponse(error);
  }
}
