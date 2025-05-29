'use client';

import { AuthLayout } from '../../layout';
import { ForgetPasswordSuccessContent } from './content';
import { useSearchParams } from 'next/navigation';

export default function ForgetPasswordSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'saramapat1990@gmail.com'; // Default for demo

  return (
    <AuthLayout headerComponent={<ForgetPasswordSuccessContent email={email} />}>
      <></>
    </AuthLayout>
  );
}
