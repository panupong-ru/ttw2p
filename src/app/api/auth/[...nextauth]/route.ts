import NextAuth from 'next-auth';
import { authOptions } from '.';

const auth = NextAuth(authOptions);

export const {
  handlers: { GET, POST },
} = auth;
