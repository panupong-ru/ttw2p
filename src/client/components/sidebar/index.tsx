'use client';

import { Box, useTheme, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { DRAWER_BACKGROUND_COLOR, DRAWER_WHITE_BACKGROUND, DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from './constants';
import SidebarHeader from './components/sidebar-header';
import SidebarMenu from './components/sidebar-menu';
import { MENU_CATEGORIES } from './menu-items';
import { MENU_CATEGORIES_COLLAPSED } from './menu-items-collapsed';
import type { SidebarProps } from './types';
import { StyledDrawer } from './styles';

export default function Sidebar({ open, onCloseAction }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const drawerContent = (
    <Box
      sx={{
        overflowX: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: open ? DRAWER_WHITE_BACKGROUND : DRAWER_BACKGROUND_COLOR,
        transition: theme.transitions.create('background-color', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <SidebarHeader open={open} onCloseAction={onCloseAction} />
      <SidebarMenu
        open={open}
        menuCategories={open ? MENU_CATEGORIES : MENU_CATEGORIES_COLLAPSED}
        pathname={pathname}
      />
    </Box>
  );

  return (
    <StyledDrawer
      variant='permanent'
      open={open}
      isMobile={isMobile}
      onClose={onCloseAction}
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
        transition: theme.transitions.create(['width', 'background-color'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        height: '100vh',
        '& .MuiPaper-root': {
          position: 'static',
          backgroundColor: open ? DRAWER_WHITE_BACKGROUND : DRAWER_BACKGROUND_COLOR,
        },
      }}
      className={`sidebar ${!open ? 'collapsed' : ''}`}
    >
      {drawerContent}
    </StyledDrawer>
  );
}
