import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Product } from '@/client/modules/master-data/product';

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Product />
    </Suspense>
  );
}
