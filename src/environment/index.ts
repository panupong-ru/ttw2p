import { createEnv } from '@t3-oss/env-nextjs';

import { envServerSchema } from './schema';

const env = createEnv({
  server: envServerSchema,
  experimental__runtimeEnv: process.env,
});

export { env };
