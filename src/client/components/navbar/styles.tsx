'use client';

import { styled } from '@mui/material/styles';
import { AppBar, IconButton } from '@mui/material';
import { NAVBAR_BACKGROUND_COLOR, NAVBAR_TEXT_COLOR } from './constants';

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: NAVBAR_BACKGROUND_COLOR,
  color: NAVBAR_TEXT_COLOR,
  boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
  width: '100%',
  zIndex: 1,
}));

export const NavIconButton = styled(IconButton)(() => ({
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
}));
