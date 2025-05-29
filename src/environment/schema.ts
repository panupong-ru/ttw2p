import { z } from 'zod';

const envServerSchema = {
  DATABASE_URL: z
    .string()
    .trim()
    .min(1)
    .readonly()
    .default(
      'sqlserver://DB_HOST_NAME:DB_PORT;database=DB_NAME;user=USER_NAME;password=PASSWORD;instance=DB_INSTANCE_NAME;connectionLimit=1;encrypt=true;trustServerCertificate=true;integratedSecurity=true;CharSet=UTF-8;'
    ),
  AUTH_SECRET: z.string().trim().min(10).readonly().default('super_secret_dev'),
  MODE: z.enum(['development', 'production', 'staging']).readonly().default('development'),
  TZ: z
    .string()
    .trim()
    .refine(
      (tz) => {
        try {
          Intl.DateTimeFormat(undefined, { timeZone: tz });
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Invalid timezone' }
    )
    .readonly()
    .default('Asia/Bangkok'),
};

export { envServerSchema };
