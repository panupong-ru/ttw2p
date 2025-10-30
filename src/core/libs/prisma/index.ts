/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PrismaPromise } from '@/../prisma-client';

import { Prisma, PrismaClient } from '@/../prisma-client';
import { Logger } from '@/core/utils/logger';
import { getThaiDate } from '@/core/utils/date-format';

const logger = new Logger('DB');

// Custom replacer function to handle BigInt
const replacer = (key: string, value: any) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
};

const prismaClientSingleton = () => {
  return new PrismaClient({}).$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          logger.log(
            `[Event] Operation: ${operation} - Model: ${model} - Time: ${time.toFixed(2)}ms - Args: ${JSON.stringify(args, replacer)}`
          );
          return result;
        },
      },
    },
    model: {
      $allModels: {
        softDelete<T, A extends Prisma.Args<T, 'update'> = Prisma.Args<T, 'update'>>(
          this: T,
          args: A
        ): PrismaPromise<Prisma.Result<T, A, 'update'>> {
          const context = Prisma.getExtensionContext(this) as any;
          const { where = {}, data = {}, ...rest } = args || {};

          Object.assign(data, { deletedAt: getThaiDate() });

          const result = context.update({
            ...(rest ? { ...rest } : {}),
            where,
            data,
          });

          return result;
        },

        restore<T, A extends Prisma.Args<T, 'update'> = Prisma.Args<T, 'update'>>(
          this: T,
          args: A
        ): PrismaPromise<Prisma.Result<T, A, 'update'>> {
          const context = Prisma.getExtensionContext(this) as any;
          const { where = {}, data = {}, ...rest } = args || {};

          Object.assign(data, { deletedAt: null });

          const result = context.update({
            ...(rest ? { ...rest } : {}),
            where,
            data,
          });

          return result;
        },
      },
    },
  });
};

declare const globalThis: typeof global & {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
