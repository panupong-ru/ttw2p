import axios from 'axios';
import type { SignInFormData } from './schema';
import { signIn as nextAuthSignIn, type SignInResponse } from 'next-auth/react';
// Custom hook สำหรับ sign-in
function useSignInAPI() {
  const signInFn = async (data: SignInFormData): Promise<SignInResponse> => {
    try {
      const result = await nextAuthSignIn('credentials', {
        LogInName: data.LogInName,
        LogInPassword: data.LogInPassword,
        rememberMe: data.rememberMe,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
      }

      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
      throw error;
    }
  };

  return {
    signInFn,
  };
}

export { useSignInAPI };
