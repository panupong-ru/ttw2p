import type { NextRequest } from 'next/server';
import { TransporterController } from './transporter.controller';
import { errorResponse, successResponse } from '@/core/utils/api-response';
import type { Transporter } from '@/../prisma-client';

const controller = new TransporterController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const transporter = await controller.getById(id);
      return successResponse(transporter);
    }

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const result = await controller.getAll(page, pageSize);
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
    const transporter = await controller.create(data as Omit<Transporter, 'DataID'>);
    return successResponse(transporter, 201);
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
    const transporter = await controller.update(id, data);
    return successResponse(transporter);
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
