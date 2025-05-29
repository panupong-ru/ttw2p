'use client';

import { useRouter } from 'next/navigation';
import { SetPasswordForm } from './form';
import { AuthLayout } from '../layout';
import { SetPasswordHeader } from './header';

export default function SetPassword() {
  const router = useRouter();

  const handleSetPasswordSuccess = () => {
    router.push('/auth/set-password/success');
  };

  return (
    <AuthLayout headerComponent={<SetPasswordHeader />}>
      <SetPasswordForm onSuccess={handleSetPasswordSuccess} />
    </AuthLayout>
  );
}
