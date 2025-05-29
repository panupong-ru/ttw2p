'use client';

import { SetPasswordFormValues } from './schema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface SetPasswordParams extends SetPasswordFormValues {
  token: string;
}

export interface SetPasswordResponse {
  success: boolean;
  message: string;
}

export const setPassword = async (data: SetPasswordParams): Promise<SetPasswordResponse> => {
  try {
    // ในการใช้งานจริง เปลี่ยนเป็น endpoint ที่เหมาะสม
    const response = await axios.post('/api/auth/set-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่');
    }
    throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
  }
};

export const useSetPassword = () => {
  return useMutation({
    mutationFn: setPassword,
  });
};
