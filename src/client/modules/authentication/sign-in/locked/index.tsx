'use client';

import { Box, Container, Paper } from '@mui/material';
import { AccountLockedContent } from './content';
import { useEffect, useState } from 'react';

export default function AccountLockedPage() {
  const [unlockTime, setUnlockTime] = useState('00:00');

  useEffect(() => {
    const storedLockTime = localStorage.getItem('accountLockTime');

    if (storedLockTime) {
      const lockTime = parseInt(storedLockTime, 10);
      const unlockDateTime = new Date(lockTime);
      setUnlockTime(unlockDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        p: 0,
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 450,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AccountLockedContent unlockTime={unlockTime} />
        </Paper>
      </Box>
    </Container>
  );
}
