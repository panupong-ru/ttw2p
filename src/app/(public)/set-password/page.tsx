import type { Metadata } from 'next';
import SetPassword from '@/client/modules/authentication/set-password/index';
import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'ตั่งค่ารหัสผ่าน',
};

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SetPassword />
    </Suspense>
  );
}
