import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { WaitWeight } from '@/client/modules/master-data/wait-weight';

export default function WeightPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <WaitWeight />
    </Suspense>
  );
}
