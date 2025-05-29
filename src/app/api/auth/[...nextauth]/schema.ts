import { object, string, boolean } from 'zod';

export const signInSchema = object({
  LogInName: string({ required_error: 'username is required' }).min(1, 'username is required'),
  LogInPassword: string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  rememberMe: boolean({ required_error: 'Remember me is required' }).optional(),
});
