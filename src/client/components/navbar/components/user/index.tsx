'use client';

import { useState } from 'react';
import { IconButton, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import type { NavbarUserProps } from '@/client/components/navbar/types';
import { AVATAR_BG_COLOR, AVATAR_SIZE } from '@/client/components/navbar/constants';
import { userMenuActions } from './handle';

export default function NavbarUser({ handleMenu: externalHandleMenu }: NavbarUserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleProfile, handleLogout } = userMenuActions;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (externalHandleMenu) {
      externalHandleMenu(event);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfile();
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <>
      <Tooltip title='บัญชีผู้ใช้'>
        <IconButton
          size='small'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'
        >
          <Avatar sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, bgcolor: AVATAR_BG_COLOR }}>U</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>
          <PersonIcon fontSize='small' sx={{ mr: 1 }} />
          โปรไฟล์
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <LogoutIcon fontSize='small' sx={{ mr: 1 }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </>
  );
}
