'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema, type ForgetPasswordFormValues } from './schema';
import { useForgetPassword } from './api';
import { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ForgetPasswordFormProps = {
  onSuccess?: () => void;
};

export const ForgetPasswordForm = ({ onSuccess }: ForgetPasswordFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const { isPending } = useForgetPassword();

  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      username: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (values: ForgetPasswordFormValues) => {
    setErrorMessage(null);

    // For demo purposes, simulate API call and redirect
    if (onSuccess) {
      onSuccess();
    }

    // In a real implementation, we would wait for the API response
    // For simulation/demo, we'll redirect immediately
    router.push(`/auth/forget-password/success?email=${encodeURIComponent(values.username)}`);

    /* Uncomment for real implementation with React Query
    requestPasswordReset(values, {
      onSuccess: (data) => {
        if (onSuccess) {
          onSuccess();
        }
        // Redirect to success page
        router.push(`/auth/forget-password/success?email=${encodeURIComponent(values.username)}`);
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
    */
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMessage && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        label='ชื่อผู้ใช้งานหรืออีเมล'
        placeholder='กรุณากรอกชื่อผู้ใช้งานหรืออีเมล'
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        disabled={isPending}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='success'
        size='large'
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={24} color='inherit' /> : 'ดำเนินการต่อ'}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant='body2'>
          <Link
            href='/auth/sign-in'
            style={{
              textDecoration: 'none',
              color: 'primary',
            }}
          >
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
