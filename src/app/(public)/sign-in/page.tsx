import type { Metadata } from 'next';
import SignIn from '@/client/modules/authentication/sign-in/index';
import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
export const metadata: Metadata = {
  title: 'เข้าสู่ระบบ',
};

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SignIn />
    </Suspense>
  );
}
