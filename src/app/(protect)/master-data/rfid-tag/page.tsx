import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { RFIDTag } from '@/client/modules/master-data/rfid-tag';

export default function RFIDTagPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <RFIDTag />
    </Suspense>
  );
}
