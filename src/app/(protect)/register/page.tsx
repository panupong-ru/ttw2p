import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Register } from '@/client/modules/register';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Register />
    </Suspense>
  );
}
