'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setPasswordSchema, SetPasswordFormValues } from './schema';
import { useSetPassword, SetPasswordResponse } from './api';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SetPasswordFormProps {
  onSuccess: (response: SetPasswordResponse) => void;
}

export const SetPasswordForm = ({ onSuccess }: SetPasswordFormProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  // แสดง/ซ่อนรหัสผ่าน
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // สถานะการส่งฟอร์ม
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // React Query hook สำหรับการตั้งรหัสผ่านใหม่
  const { mutate: setPasswordMutation, isPending } = useSetPassword();

  // สถานะความถูกต้องของรหัสผ่าน
  const [passwordStrength, setPasswordStrength] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    hasMinLength: false,
  });

  // React Hook Form
  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // ดึงฟังก์ชันต่างๆ จาก Hook Form
  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  const password = watch('password');

  // ตรวจสอบความแข็งแรงของรหัสผ่านเมื่อมีการพิมพ์
  useEffect(() => {
    setPasswordStrength({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
      hasMinLength: password.length >= 8,
    });
  }, [password]);

  // Function ส่งฟอร์ม
  const onSubmit = (values: SetPasswordFormValues) => {
    setErrorMessage(null);

    // ส่งข้อมูลไปยัง API พร้อม token
    setPasswordMutation(
      { ...values, token },
      {
        onSuccess: (response) => {
          onSuccess(response);
        },
        onError: (error) => {
          setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่');
        },
      }
    );
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMessage && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        margin='normal'
        required
        fullWidth
        id='password'
        label='รหัสผ่านใหม่'
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1 }}
      />

      {/* แสดงเงื่อนไขความแข็งแรงของรหัสผ่าน */}
      <List dense sx={{ py: 0 }}>
        <ListItem sx={{ py: 0.2 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {passwordStrength.hasUppercase ? (
              <CheckCircleOutlineIcon color='success' fontSize='small' />
            ) : (
              <ErrorOutlineIcon color='error' fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary='รหัสผ่านต้องประกอบด้วยตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'
            primaryTypographyProps={{
              variant: 'caption',
              color: passwordStrength.hasUppercase ? 'text.secondary' : 'error',
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0.2 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {passwordStrength.hasLowercase ? (
              <CheckCircleOutlineIcon color='success' fontSize='small' />
            ) : (
              <ErrorOutlineIcon color='error' fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary='รหัสผ่านต้องประกอบด้วยตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'
            primaryTypographyProps={{
              variant: 'caption',
              color: passwordStrength.hasLowercase ? 'text.secondary' : 'error',
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0.2 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {passwordStrength.hasNumber ? (
              <CheckCircleOutlineIcon color='success' fontSize='small' />
            ) : (
              <ErrorOutlineIcon color='error' fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary='รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว'
            primaryTypographyProps={{
              variant: 'caption',
              color: passwordStrength.hasNumber ? 'text.secondary' : 'error',
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0.2 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {passwordStrength.hasSpecial ? (
              <CheckCircleOutlineIcon color='success' fontSize='small' />
            ) : (
              <ErrorOutlineIcon color='error' fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary='รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว'
            primaryTypographyProps={{
              variant: 'caption',
              color: passwordStrength.hasSpecial ? 'text.secondary' : 'error',
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0.2 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            {passwordStrength.hasMinLength ? (
              <CheckCircleOutlineIcon color='success' fontSize='small' />
            ) : (
              <ErrorOutlineIcon color='error' fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary='รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว'
            primaryTypographyProps={{
              variant: 'caption',
              color: passwordStrength.hasMinLength ? 'text.secondary' : 'error',
            }}
          />
        </ListItem>
      </List>

      <TextField
        margin='normal'
        required
        fullWidth
        id='confirmPassword'
        label='ยืนยันรหัสผ่านใหม่'
        type={showConfirmPassword ? 'text' : 'password'}
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle confirm password visibility'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge='end'
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2, mb: 3 }}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='success'
        size='large'
        disabled={isPending}
        sx={{ mt: 2, mb: 2, py: 1.5 }}
      >
        {isPending ? <CircularProgress size={24} color='inherit' /> : 'ยืนยัน'}
      </Button>
    </Box>
  );
};
