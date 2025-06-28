import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export type FileValidationOptions = {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
};

export type FileUploadOptions = {
  uploadDir: string; // relative path from public/uploads/
  validation?: FileValidationOptions;
};

const DEFAULT_OPTIONS: FileValidationOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain'],
};

export class FileUploadService {
  private static validateFile(file: File, options: FileValidationOptions): string | null {
    const { maxSize, allowedTypes } = { ...DEFAULT_OPTIONS, ...options };

    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }

    return null;
  }

  private static async ensureUploadDirectoryExists(uploadPath: string) {
    try {
      await mkdir(uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
      throw new Error('Failed to create upload directory');
    }
  }

  static async uploadFile(file: File, options: FileUploadOptions): Promise<string> {
    // Validate file if options provided
    if (options.validation) {
      const validationError = this.validateFile(file, options.validation);
      if (validationError) {
        throw new Error(validationError);
      }
    }

    // Create full upload path
    const baseUploadDir = join(process.cwd(), 'public', 'uploads');
    const fullUploadDir = join(baseUploadDir, options.uploadDir);

    // Ensure directory exists
    await this.ensureUploadDirectoryExists(fullUploadDir);

    // Add timestamp to filename to prevent duplicates
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(join(fullUploadDir, filename), buffer);

    // Return relative path from public directory
    return `/uploads/${options.uploadDir}/${filename}`;
  }

  static async uploadFiles(files: Record<string, File>, options: FileUploadOptions): Promise<Record<string, string>> {
    const results: Record<string, string> = {};
    const errors: Record<string, string> = {};

    // Process all files
    await Promise.all(
      Object.entries(files).map(async ([key, file]) => {
        try {
          results[key] = await this.uploadFile(file, options);
        } catch (error: any) {
          errors[key] = error.message;
        }
      })
    );

    // If any errors occurred, throw with details
    if (Object.keys(errors).length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    return results;
  }
}
