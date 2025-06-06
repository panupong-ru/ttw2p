import { WeightType } from '@/client/modules/weight-type';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import { Suspense } from 'react';

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
