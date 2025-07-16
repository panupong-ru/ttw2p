import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Weight } from '@/client/modules/master-data/weight';

export default function WeightPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Weight />
    </Suspense>
  );
}
