'use client';

import { SignInForm } from './form';
import { AuthLayout } from '../layout';
import { SignInHeader } from './header';
import { useSignInAPI } from './api';
import type { SignInFormData } from './schema';
import { useState } from 'react';
import { ROUTE } from '@/core/constants/route';
import { useRouter } from 'next/navigation';
export default function SignIn() {
  const { signInFn } = useSignInAPI();
  const [isSignInPending, setIsSignInPending] = useState(false);
  const [errorApi, setErrorApi] = useState('');
  const router = useRouter();
  const handleSubmit = async (data: SignInFormData) => {
    setErrorApi('');
    setIsSignInPending(true);

    try {
      const res = await signInFn(data);

      if (res.error) {
        setErrorApi('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
        setIsSignInPending(false);

        return;
      }

      router.push(ROUTE.HOME);
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorApi('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
      setIsSignInPending(false);
    }
  };
  return (
    <AuthLayout headerComponent={<SignInHeader />}>
      <SignInForm onSubmit={handleSubmit} errorApi={errorApi} isPending={isSignInPending} />
    </AuthLayout>
  );
}
