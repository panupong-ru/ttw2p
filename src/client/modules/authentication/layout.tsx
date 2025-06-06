'use client';

import type { ReactNode } from 'react';
import { Box, Container, Paper, useTheme } from '@mui/material';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
  headerComponent: ReactNode;
  pageTitle?: string;
};

export const AuthLayout = ({ children, headerComponent, pageTitle = 'Authentication' }: AuthLayoutProps) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        p: 0,
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
      }}
      role='main'
      aria-label={`${pageTitle} page`}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 30,
            zIndex: 10,
          }}
          role='banner'
        >
          <Image src='/images/logo.ico' alt='MCOT Logo' width={50} height={50} priority sizes='50px' quality={90} />
        </Box>

        <Box
          sx={{
            width: '60%',
            bgcolor: theme.palette.background.lightBg,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            position: 'relative',
            borderRight: `1px solid ${theme.palette.divider}`,
          }}
          aria-hidden='true'
        >
          <Image
            src='/images/login-illustration.svg'
            alt='Authentication Illustration'
            width={500}
            height={300}
            style={{
              maxWidth: '100%',
              objectFit: 'contain',
            }}
            priority
            sizes='(max-width: 768px) 100vw, 500px'
            quality={85}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            bgcolor: theme.palette.background.paper,
          }}
          role='region'
          aria-labelledby='auth-header'
        >
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 450,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div id='auth-header'>{headerComponent}</div>
            <Box sx={{ width: '100%' }} role='form'>
              {children}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};
