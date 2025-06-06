import type { NextRequest } from 'next/server';
import { WeightTypeController } from './weight-type.controller';
import { successResponse, errorResponse } from '@/core/utils/api-response';

const controller = new WeightTypeController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const weightType = await controller.getById(id);
      return successResponse(weightType);
    }

    const data = await controller.getAll();
    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await controller.create(body);
    return successResponse(data, 201);
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

    const body = await request.json();
    const data = await controller.update(id, body);
    return successResponse(data);
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
