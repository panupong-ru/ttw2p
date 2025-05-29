'use client';

import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';

export const SetPasswordSuccessContent = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircleIcon color='success' sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant='h5' component='h1' color='success.main' sx={{ mb: 2 }}>
        เปลี่ยนรหัสผ่านสำเร็จ
      </Typography>

      <Typography variant='body1' sx={{ mb: 4 }}>
        คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที
      </Typography>

      <Button
        component={Link}
        href='/auth/sign-in'
        variant='contained'
        color='success'
        size='large'
        sx={{ py: 1.5, px: 4 }}
      >
        เข้าสู่ระบบทันที
      </Button>
    </Box>
  );
};
