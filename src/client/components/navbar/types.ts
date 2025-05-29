export interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen?: boolean;
}

export interface UserMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

export interface NavbarNotificationsProps {
  notificationCount?: number;
}

export interface NavbarUserProps {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
}
