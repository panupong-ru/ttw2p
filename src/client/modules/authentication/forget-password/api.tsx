'use client';

import type { ForgetPasswordFormValues } from './schema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type ForgetPasswordResponse = {
  success: boolean;
  message: string;
};

export const forgetPassword = async (data: ForgetPasswordFormValues): Promise<ForgetPasswordResponse> => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.post('/api/auth/forget-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'เกิดข้อผิดพลาดในการส่งคำขอรีเซ็ตรหัสผ่าน');
    }
    throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
  }
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};
