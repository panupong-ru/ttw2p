'use client';

import { ForgetPasswordForm } from './form';
import { AuthLayout } from '../layout';
import { useRouter } from 'next/navigation';
import { ForgetPasswordHeader } from './header';

export default function ForgetPassword() {
  const router = useRouter();

  const handleForgetPasswordSuccess = () => {
    // ส่งข้อมูล email ไปยังหน้า success
    const email = document.getElementById('username') as HTMLInputElement;
    const emailValue = email ? email.value : '';
    router.push(`/auth/forget-password/success?email=${encodeURIComponent(emailValue)}`);
  };

  return (
    <AuthLayout headerComponent={<ForgetPasswordHeader />}>
      <ForgetPasswordForm onSuccess={handleForgetPasswordSuccess} />
    </AuthLayout>
  );
}
