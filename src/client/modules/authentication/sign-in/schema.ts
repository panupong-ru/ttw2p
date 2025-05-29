import { z } from 'zod';

export const signInSchema = z.object({
  LogInName: z.string().min(1, { message: 'ชื่อผู้ใช้งานต้องมีอย่างน้อย 1 ตัวอักษร' }),
  LogInPassword: z
    .string()
    .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
    .max(50, { message: 'รหัสผ่านต้องไม่เกิน 50 ตัวอักษร' }),
  rememberMe: z.boolean().optional().default(false),
});

export type SignInFormData = z.infer<typeof signInSchema>;
