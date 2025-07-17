import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Weight2 } from '@/client/modules/master-data/weight2';

export default function Weight2Page() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Weight2 />
    </Suspense>
  );
}
