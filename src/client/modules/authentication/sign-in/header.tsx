'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const SignInHeader = () => {
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
        ยินดีต้อนรับ
      </Typography>
      <Typography variant='subtitle1' color='success.dark' fontWeight='bold'>
        THEO TruckWeight
      </Typography>
      <Typography
        variant='body2'
        sx={{ mt: 1, color: 'text.secondary' }}
        dangerouslySetInnerHTML={{
          __html: 'คุณสามารถเข้าสู่ระบบได้ด้วย <br /> ชื่อผู้ใช้งานและรหัสผ่านของระบบ THEO TruckWeight',
        }}
      />
    </Box>
  );
};
