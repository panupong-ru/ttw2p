import type { NextRequest } from 'next/server';
import { RFIDTagController } from './rfid-tag.controller';
import { successResponse, errorResponse } from '@/core/utils/api-response';
import { FileUploadService } from '@/core/utils/file-upload';
import type { RFIDTag } from '@/../prisma-client';

const controller = new RFIDTagController();

// File upload configuration
const fileUploadOptions = {
  uploadDir: 'rfid-tag',
  validation: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain'],
  },
};

// GET - Get all RFIDTags or single RFIDTag
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

// POST - Create new RFIDTag
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
        // Convert string 'null' to actual null and empty string to null
        data[key] = value === 'null' || value === '' ? null : value;
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

    const result = await controller.create(data as RFIDTag);
    return successResponse(result, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

// PUT - Update RFIDTag
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
        data[key] = value === 'null' || value === '' ? null : value;
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

    const result = await controller.update(id, data as Partial<RFIDTag>);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE - Delete RFIDTag
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
