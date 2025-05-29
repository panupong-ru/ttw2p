import { z } from 'zod';

export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว')
      .regex(/[A-Z]/, 'รหัสผ่านต้องประกอบด้วยตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว')
      .regex(/[a-z]/, 'รหัสผ่านต้องประกอบด้วยตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว')
      .regex(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
      .regex(/[^A-Za-z0-9]/, 'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  });

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
