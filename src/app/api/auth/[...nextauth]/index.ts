import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/core/libs/prisma';
import { SYSTEM_CONFIG } from '@/core/constants/system';
import { signInSchema } from './schema';
import { env } from '@/environment';
import { ROUTE } from '@/core/constants/route';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        LogInName: {},
        LogInPassword: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        try {
          const rememberMe = credentials.rememberMe === true || credentials.rememberMe === 'true';
          const { LogInName, LogInPassword } = credentials;
          const parsed = await signInSchema.parseAsync({
            LogInName,
            LogInPassword,
            rememberMe,
          });

          const user = await prisma.userLogIn.findUnique({
            where: { LogInName: parsed.LogInName },
          });

          if (!user || !user.LogInPassword) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(parsed.LogInPassword, user.LogInPassword);

          if (!isPasswordValid) {
            return null;
          }

          // Transform to NextAuth User format
          return {
            id: user.DataID,
            name: user.FullName || undefined,
            email: user.LogInName,
            role: user.Permission || undefined,
            rememberMe: parsed.rememberMe || undefined,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.sub;
        if (token.role) {
          session.user.role = token.role;
        }
      }
      return session;
    },
    jwt: ({ token, user }: { token: JWT; user: User | undefined }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.rememberMe = user.rememberMe;

        const expiryTime = user.rememberMe
          ? 30 * 24 * 60 * 60 // 30 days
          : 60 * 60 * 24 * SYSTEM_CONFIG.COOKIE_EXPIRES_DAYS;

        token.exp = Math.floor(Date.now() / 1000) + expiryTime;
      }
      return token;
    },
  },
  pages: {
    signIn: ROUTE.SIGN_IN,
  },
  secret: env.AUTH_SECRET,
  trustHost: true,
  debug: true,
  useSecureCookies: env.MODE === 'production',
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: env.MODE === 'production',
      },
    },
  },
  redirectProxyUrl: '/api/auth',
  redirects: {
    signIn: ROUTE.HOME,
    signOut: ROUTE.SIGN_IN,
  },
};
