'use client';

import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ROUTE } from '@/core/constants/route';
interface AccountLockedProps {
  unlockTime?: string; // Optional since we're not using it anymore
}

export const AccountLockedContent = ({}: AccountLockedProps) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const storedLockTime = localStorage.getItem('accountLockTime');
      if (!storedLockTime) return;

      const lockTime = parseInt(storedLockTime, 10);
      const now = Date.now();
      const timeLeft = Math.max(0, lockTime - now);

      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // อัพเดทเวลาทุกวินาที
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (timeLeft) {
        setCountdown(timeLeft);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    // เซ็ตค่าเริ่มต้น
    setCountdown(calculateTimeLeft() || '');

    return () => clearInterval(timer);
  }, []);

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
        priority
      />

      <Typography variant='h5' component='h1' color='success.main' sx={{ mb: 2 }}>
        บัญชีถูกระงับการใช้งานชั่วคราว
      </Typography>

      <Typography variant='body1' sx={{ mb: 3 }}>
        กรุณารอ {countdown} นาที
      </Typography>

      <Typography variant='body2' sx={{ mb: 3, color: 'text.secondary' }}>
        หากพบปัญหาการเข้าสู่ระบบ{' '}
        <Link href={ROUTE.FORGET_PASSWORD} style={{ color: 'success.main', fontWeight: 'bold' }}>
          กรุณาติดต่อผู้ดูแลระบบ
        </Link>
      </Typography>

      <Button component={Link} href={ROUTE.SIGN_IN} variant='outlined' color='success' sx={{ mt: 2, px: 4 }}>
        กลับหน้าเข้าสู่ระบบ
      </Button>
    </Box>
  );
};
