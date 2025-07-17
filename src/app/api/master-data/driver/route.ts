import type { NextRequest } from 'next/server';
import { DriverController } from './driver.controller';
import { errorResponse, successResponse } from '@/core/utils/api-response';
import type { Driver } from '@/../prisma-client';

const controller = new DriverController();

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
    const data: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const driver = await controller.create(data as Omit<Driver, 'DataID'>);
    return successResponse(driver, 201);
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
    const data: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const driver = await controller.update(id, data);
    return successResponse(driver);
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
