import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { WeightUnit } from '@/client/modules/master-data/weight-unit';

export default function WeightUnitPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <WeightUnit />
    </Suspense>
  );
}
