import type { Metadata } from 'next';

import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import ForgetPassword from '@/client/modules/authentication/forget-password';

export const metadata: Metadata = {
  title: 'ลืมรหัสผ่าน',
};

export default function ForgetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ForgetPassword />
    </Suspense>
  );
}
