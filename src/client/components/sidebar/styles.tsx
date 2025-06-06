'use client';

import { styled } from '@mui/material/styles';
import { Drawer, ListItemButton, styled as muiStyled } from '@mui/material';
import {
  DRAWER_WIDTH,
  COLLAPSED_DRAWER_WIDTH,
  DRAWER_BACKGROUND_COLOR,
  DRAWER_WHITE_BACKGROUND,
  DRAWER_ACTIVE_COLOR,
  DRAWER_HOVER_COLOR,
  TEXT_DARK,
  TEXT_LIGHT,
} from './constants';

// Custom styled component to handle active item with shouldForwardProp
export const CustomListItemButton = muiStyled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'sidebarOpen',
})<{
  active: number;
  sidebarOpen: boolean;
}>(({ active, sidebarOpen, theme }) => ({
  backgroundColor: active ? (sidebarOpen ? DRAWER_ACTIVE_COLOR : DRAWER_HOVER_COLOR) : 'transparent',
  color: active ? TEXT_LIGHT : sidebarOpen ? TEXT_DARK : TEXT_LIGHT,
  borderRadius: sidebarOpen ? '8px' : '50%',
  margin: sidebarOpen ? '4px 8px' : '4px auto',
  width: sidebarOpen ? 'auto' : 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['background-color', 'transform', 'color', 'width'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    backgroundColor: sidebarOpen ? DRAWER_ACTIVE_COLOR : DRAWER_HOVER_COLOR,
    color: TEXT_LIGHT,
    transform: sidebarOpen ? 'translateX(5px)' : 'scale(1.1)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? TEXT_LIGHT : sidebarOpen ? DRAWER_ACTIVE_COLOR : TEXT_LIGHT,
    minWidth: 0,
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.standard,
    }),
  },
  '& .MuiTypography-root': {
    fontWeight: active ? 500 : 400,
    color: active ? TEXT_LIGHT : 'inherit',
    fontSize: '0.95rem',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.standard,
    }),
  },
  '&:hover .MuiListItemIcon-root': {
    color: TEXT_LIGHT,
  },
  '&:hover .MuiTypography-root': {
    color: TEXT_LIGHT,
  },
}));

// Custom styled component for the drawer
export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<{
  open: boolean;
  isMobile: boolean;
}>(({ theme, open, isMobile }) => ({
  width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 10,
  height: '100%',
  '& .MuiDrawer-paper': {
    backgroundColor: open ? DRAWER_WHITE_BACKGROUND : DRAWER_BACKGROUND_COLOR,
    color: open ? TEXT_DARK : TEXT_LIGHT,
    width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
    position: 'absolute',
    overflowX: 'hidden',
    border: 'none',
    transition: theme.transitions.create(['width', 'background-color', 'color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: 'none',
    height: '100vh',
    top: 0,
    bottom: 0,
  },
  '&.collapsed .MuiDrawer-paper': {
    backgroundColor: DRAWER_BACKGROUND_COLOR,
    color: TEXT_LIGHT,
  },
  ...(open &&
    !isMobile && {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        backgroundColor: DRAWER_WHITE_BACKGROUND,
      },
    }),
  ...(!open &&
    !isMobile && {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: COLLAPSED_DRAWER_WIDTH,
      '& .MuiDrawer-paper': {
        width: COLLAPSED_DRAWER_WIDTH,
        backgroundColor: DRAWER_BACKGROUND_COLOR,
      },
    }),
}));
