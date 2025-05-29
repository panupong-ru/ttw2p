'use client';

import { signOut } from 'next-auth/react';
import { ROUTE } from '@/core/constants/route';

export const userMenuActions = {
  handleProfile: () => {
    window.location.href = ROUTE.HOME;
  },
  handleLogout: async () => {
    await signOut({ redirect: true, callbackUrl: ROUTE.SIGN_IN });
  },
};
