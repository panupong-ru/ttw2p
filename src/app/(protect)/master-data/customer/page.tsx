import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Customer } from '@/client/modules/master-data/customer';

export default function CustomerPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Customer />
    </Suspense>
  );
}
