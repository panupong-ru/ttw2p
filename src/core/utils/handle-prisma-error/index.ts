import { z } from 'zod';

import { Prisma } from '@/../prisma-client';

import { ErrorService } from '../error-service';
import { PRISMA_ERROR_MESSAGE } from '@/core/constants/prisma-error-message';

const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ErrorService(422, 'Invalid input data format', { error });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const message = PRISMA_ERROR_MESSAGE?.[error.code as keyof typeof PRISMA_ERROR_MESSAGE];
    if (message) throw new ErrorService(500, message, { error });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new ErrorService(500, 'Critical database error', { error });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new ErrorService(503, 'Database connection failed', { error });
  }

  const err = z.any().safeParse(error)?.data;
  if (err?.code) {
    const message = PRISMA_ERROR_MESSAGE?.[err.code as keyof typeof PRISMA_ERROR_MESSAGE];
    if (message) throw new ErrorService(500, message, { error });
  }

  throw new ErrorService(500, 'Unexpected database error', { error });
};

export { handlePrismaError };
