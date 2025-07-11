import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Truck } from '@/client/modules/master-data/truck';

export default function TruckPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Truck />
    </Suspense>
  );
}
