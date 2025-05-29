import { DashBoard } from '@/client/modules/dashboard';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import { Suspense } from 'react';

export default function DashBoardPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <DashBoard />
    </Suspense>
  );
}
