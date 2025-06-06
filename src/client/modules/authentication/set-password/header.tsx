'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const SetPasswordHeader = () => {
  return (
    <Box sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
      <Image
        src='/images/logo.ico'
        alt='Logo'
        width={60}
        height={60}
        style={{
          marginBottom: '8px',
        }}
      />
      <Typography variant='h5' component='h1' color='success.main'>
        ตั้งรหัสผ่านใหม่
      </Typography>
      <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
        กรุณากรอกรหัสผ่านใหม่ตามข้อกำหนด
      </Typography>
    </Box>
  );
};
