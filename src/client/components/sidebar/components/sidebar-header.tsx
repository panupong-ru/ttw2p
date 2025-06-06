'use client';

import { Box, useTheme, IconButton } from '@mui/material';
import Image from 'next/image';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import type { SidebarHeaderProps } from '../types';
import { DRAWER_BACKGROUND_COLOR, DRAWER_WHITE_BACKGROUND } from '../constants';

export default function SidebarHeader({ open, onCloseAction }: SidebarHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'space-between' : 'center',
        px: open ? 2 : 0,
        backgroundColor: open ? DRAWER_WHITE_BACKGROUND : DRAWER_BACKGROUND_COLOR,
        transition: theme.transitions.create(['padding', 'justify-content', 'background-color'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      {open ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src='/images/logo.ico' alt='Logo' width={40} height={30} priority quality={90} />
          </Box>
          <IconButton
            onClick={onCloseAction}
            sx={{
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <KeyboardDoubleArrowLeftIcon
              sx={{
                color: 'inherit',
              }}
            />
          </IconButton>
        </>
      ) : (
        <Box
          sx={{
            width: 55,
            height: 55,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: DRAWER_WHITE_BACKGROUND,
            borderRadius: '50%',
            padding: '4px',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Image src='/images/logo.ico' alt='Logo' width={40} height={30} priority quality={90} />
        </Box>
      )}
    </Box>
  );
}
