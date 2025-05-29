/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { z } from 'zod';

import type { envServerSchema } from '@/environment/schema';

const _envServer = z.object(envServerSchema);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof _envServer> {}
  }
}

export {};
