'use client';

import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { NavbarNotificationsProps } from '@/client/components/navbar/types';
import { NAVBAR_ICON_BG_COLOR, NAVBAR_ICON_HOVER_COLOR } from '@/client/components/navbar/constants';

export default function NavbarNotifications({ notificationCount = 0 }: NavbarNotificationsProps) {
  return (
    <IconButton
      color='inherit'
      size='small'
      sx={{
        bgcolor: NAVBAR_ICON_BG_COLOR,
        mr: 1,
        '&:hover': {
          bgcolor: NAVBAR_ICON_HOVER_COLOR,
        },
      }}
    >
      <Badge badgeContent={notificationCount} color='error'>
        <NotificationsIcon fontSize='small' />
      </Badge>
    </IconButton>
  );
}
