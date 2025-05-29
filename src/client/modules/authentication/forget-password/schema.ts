import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  username: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้งานหรืออีเมล'),
});

export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;
