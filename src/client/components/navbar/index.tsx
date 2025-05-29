'use client';

import { Toolbar, IconButton, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavbarProps } from './types';
import { StyledAppBar } from './styles';
import NavbarNotifications from './components/notifications';
import NavbarUser from './components/user';

export default function Navbar({ onToggleSidebar, sidebarOpen = true }: NavbarProps) {
  return (
    <StyledAppBar position='static' elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', pl: sidebarOpen ? 2 : 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='inherit' aria-label='toggle sidebar' edge='start' onClick={onToggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NavbarNotifications notificationCount={2} />

          <Divider orientation='vertical' flexItem sx={{ height: 24, my: 'auto', mx: 1 }} />

          <NavbarUser handleMenu={() => {}} />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
