import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { WeightType } from '@/client/modules/master-data/weight-type';

export default function WeightTypePage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <WeightType />
    </Suspense>
  );
}
