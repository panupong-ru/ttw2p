import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { Transporter } from '@/client/modules/master-data/transporter';

export default function TransporterPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <Transporter />
    </Suspense>
  );
}
