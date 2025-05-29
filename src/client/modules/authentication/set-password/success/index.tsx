'use client';

import { AuthLayout } from '../../layout';
import { SetPasswordSuccessContent } from './content';

export default function SetPasswordSuccessPage() {
  return (
    <AuthLayout headerComponent={<SetPasswordSuccessContent />}>
      <></>
    </AuthLayout>
  );
}
