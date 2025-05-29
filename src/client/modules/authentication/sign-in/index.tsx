'use client';

import { SignInForm } from './form';
import { AuthLayout } from '../layout';
import { SignInHeader } from './header';
import { useLoginAttempts } from '@/client/hooks/useLoginAttempts';
import { useSignInAPI } from './api';
import type { SignInFormData } from './schema';
import { useState } from 'react';
import { ROUTE } from '@/core/constants/route';
import { useRouter } from 'next/navigation';
import { AccountLockedContent } from './locked/content';
export default function SignIn() {
  const { isLocked, unlockTime, loginAttempts, error, setError, incrementAttempt } = useLoginAttempts();
  const { signInFn } = useSignInAPI();
  const [isSignInPending, setIsSignInPending] = useState(false);
  const [errorApi, setErrorApi] = useState('');
  const [showLocked, setShowLocked] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: SignInFormData) => {
    setError(null);
    setErrorApi('');
    setIsSignInPending(true);

    // ถ้าบัญชียังถูกล็อกอยู่ ไม่ให้ส่งคำขอไปเซิร์ฟเวอร์
    if (isLocked) {
      setIsSignInPending(false);
      setShowLocked(true);
      return;
    }

    try {
      const res = await signInFn(data);

      if (res.error) {
        incrementAttempt();
        setErrorApi('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
        setIsSignInPending(false);

        if (loginAttempts + 1 >= 3) {
          if (isLocked) {
            setShowLocked(true);
          }
        }
        return;
      }

      router.push(ROUTE.HOME);
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorApi('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
      setIsSignInPending(false);
    }
  };

  if (showLocked) {
    return (
      <AuthLayout headerComponent={<AccountLockedContent unlockTime={unlockTime} />}>
        <></>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout headerComponent={<SignInHeader />}>
      <SignInForm
        onSubmit={handleSubmit}
        isLocked={isLocked}
        unlockTime={unlockTime}
        loginAttempts={loginAttempts}
        error={error}
        errorApi={errorApi}
        isPending={isSignInPending}
      />
    </AuthLayout>
  );
}
