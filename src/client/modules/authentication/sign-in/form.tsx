import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInSchema, type SignInFormData } from './schema';

export type SignInFormProps = {
  onSubmit: (data: SignInFormData) => void;
  isPending: boolean;
  errorApi: string | null;
};

export const SignInForm = ({ onSubmit, isPending, errorApi }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      LogInName: '',
      LogInPassword: '',
      rememberMe: false,
    },
  });

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register('LogInName')}
        margin='normal'
        required
        fullWidth
        id='LogInName'
        label='ชื่อผู้ใช้'
        autoComplete='LogInName'
        error={!!errors.LogInName}
        helperText={errors.LogInName?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        {...register('LogInPassword')}
        margin='normal'
        required
        fullWidth
        label='รหัสผ่าน'
        type={showPassword ? 'text' : 'password'}
        id='LogInPassword'
        autoComplete='current-password'
        error={!!errors.LogInPassword}
        helperText={errors.LogInPassword?.message || errorApi}
        sx={{ mb: 2 }}
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
      />

      {errorApi ? (
        <Stack
          sx={{
            marginBottom: '10px',
            color: 'error',
            wordWrap: 'break-word',
            whiteSpace: 'pre-line',
          }}
        >
          <Typography variant='body2' color='error'>
            {errorApi}
          </Typography>
        </Stack>
      ) : (
        <Box sx={{ minHeight: '42px' }} />
      )}

      <FormControlLabel
        control={<Checkbox {...register('rememberMe')} color='primary' />}
        label='จดจำฉันไว้ในระบบ'
        sx={{ mb: 2 }}
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='success'
        size='large'
        disabled={isPending}
        sx={{
          py: 1.5,
          fontWeight: 'bold',
          boxShadow: 1,
        }}
      >
        {isPending ? <CircularProgress size={24} color='inherit' /> : 'เข้าสู่ระบบ'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href='/auth/forget-password' sx={{ color: 'success.main', fontWeight: 'medium' }}>
          ลืมรหัสผ่าน?
        </Link>
      </Box>
    </Box>
  );
};
