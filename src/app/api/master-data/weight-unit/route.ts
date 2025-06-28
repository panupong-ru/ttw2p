import type { NextRequest } from 'next/server';
import { WeightUnitController } from './weight-unit.controller';
import { errorResponse, successResponse } from '@/core/utils/api-response';
import type { WeightUnit } from '@/../prisma-client';

const controller = new WeightUnitController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const weightUnit = await controller.getById(id);
      return successResponse(weightUnit);
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
    const data: Record<string, string | number | null> = {};

    for (const [key, value] of formData.entries()) {
      // Convert KgToUnit to number if provided
      if (key === 'KgToUnit' && value) {
        data[key] = parseFloat(value as string);
      } else if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const weightUnit = await controller.create(data as Omit<WeightUnit, 'DataID'>);
    return successResponse(weightUnit, 201);
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
      // Convert KgToUnit to number if provided
      if (key === 'KgToUnit' && value) {
        data[key] = parseFloat(value as string);
      } else if (value === '' || value === 'null' || value === 'undefined') {
        data[key] = null;
      } else {
        data[key] = value as string;
      }
    }
    const weightUnit = await controller.update(id, data);
    return successResponse(weightUnit);
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
