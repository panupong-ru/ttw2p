import 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type Session = DefaultSession & {
    user: DefaultSession['user'] & {
      role?: string;
      DataID?: string;
      id?: string;
    };
    expires: string;
  };
  type User = {
    rememberMe?: boolean;
    role?: string;
    DataID?: string;
    id?: string;
  };
}

declare module 'next-auth/jwt' {
  type JWT = {
    rememberMe?: boolean;
    role?: string;
    DataID?: string;
    id?: string;
    sub?: string;
    exp?: number;
  };
}
