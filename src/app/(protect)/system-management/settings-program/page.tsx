import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';

import { SettingsProgram } from '@/client/modules/system-management/settings-program';

export default function SettingsProgramPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SettingsProgram />
    </Suspense>
  );
}
