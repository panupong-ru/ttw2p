'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const ForgetPasswordHeader = () => {
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
        ลืมรหัสผ่าน ?
      </Typography>
      <Typography variant='subtitle1' color='success.dark' fontWeight='bold'>
        กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านใหม่
      </Typography>
      <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
        หากพบปัญหาการเข้าสู่ระบบ กรุณาติดต่อผู้ดูแลระบบ
      </Typography>
    </Box>
  );
};
