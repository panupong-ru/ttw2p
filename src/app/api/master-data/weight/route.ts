import type { NextRequest } from 'next/server';
import { WeightController } from './weight.controller';
import { successResponse, errorResponse } from '@/core/utils/api-response';
import { FileUploadService } from '@/core/utils/file-upload';
import type { Weight } from '@/../prisma-client';

const controller = new WeightController();

// File upload configuration
const fileUploadOptions = {
  uploadDir: 'weight',
  validation: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain'],
  },
};

// GET - Get all Weights or single Weight
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const weight = await controller.getById(id);
      return successResponse(weight);
    }

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const result = await controller.getAll(page, pageSize);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

// POST - Create new Weight
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string | null> = {};
    const files: Record<string, File> = {};

    // Separate files and other data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value;
      } else {
        data[key] = value;
      }
    }

    // Upload files if any
    if (Object.keys(files).length > 0) {
      try {
        const uploadedFiles = await FileUploadService.uploadFiles(files, fileUploadOptions);
        Object.assign(data, uploadedFiles);
      } catch (error: unknown) {
        return errorResponse(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 400);
      }
    }

    const result = await controller.create(data as Omit<Weight, 'DataID'>);
    return successResponse(result, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

// PUT - Update Weight
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
      return errorResponse('ID is required', 400);
    }

    const formData = await request.formData();
    const data: Record<string, string | null> = {};
    const files: Record<string, File> = {};

    // Separate files and other data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value;
      } else {
        data[key] = value;
      }
    }

    // Upload files if any
    if (Object.keys(files).length > 0) {
      try {
        const uploadedFiles = await FileUploadService.uploadFiles(files, fileUploadOptions);
        Object.assign(data, uploadedFiles);
      } catch (error: unknown) {
        return errorResponse(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 400);
      }
    }

    const result = await controller.update(id, data as Partial<Weight>);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE - Delete Weight
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
