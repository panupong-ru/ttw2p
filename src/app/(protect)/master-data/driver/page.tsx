import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Driver } from '@/client/modules/master-data/driver';

export default function DriverPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Driver />
    </Suspense>
  );
}
