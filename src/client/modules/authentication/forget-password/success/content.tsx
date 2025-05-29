'use client';

import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface ForgetPasswordSuccessProps {
  email: string;
}

export const ForgetPasswordSuccessContent = ({ email }: ForgetPasswordSuccessProps) => {
  return (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      <Image
        src='/images/logo.png'
        alt='Logo'
        width={60}
        height={60}
        style={{
          marginBottom: '16px',
        }}
      />

      <Typography variant='h5' component='h1' color='success.main' sx={{ mb: 2 }}>
        ระบบได้ส่งอีเมลสำหรับกู้คืนรหัสผ่านเรียบร้อยแล้ว
      </Typography>

      <Typography variant='body1' sx={{ mb: 1 }}>
        กรุณาตรวจสอบอีเมลของท่าน
      </Typography>

      <Typography variant='body1' color='success.main' fontWeight='bold' sx={{ mb: 3 }}>
        {email}
      </Typography>

      <Typography variant='body2' sx={{ mb: 4 }}>
        โปรดตรวจสอบจดหมายเข้า (Inbox) หากไม่พบกรุณาตรวจสอบในกล่องจดหมายขยะ (Junk หรือ Spam)
      </Typography>

      <Typography variant='body2' sx={{ mb: 2 }}>
        หากพบปัญหาในการสมัครกรุณาติดต่อ
        <br />
        000-000-0000
      </Typography>

      <Typography variant='body2' sx={{ mb: 4 }}>
        หากยังไม่ได้รับอีเมลใดๆ?{' '}
        <Link href='/auth/forget-password' style={{ color: '#1e8e4f', fontWeight: 'bold' }}>
          คลิกที่นี่
        </Link>
      </Typography>

      <Button component={Link} href='/auth/sign-in' variant='outlined' color='success' sx={{ mt: 2, px: 4 }}>
        ย้อนกลับ
      </Button>
    </Box>
  );
};
