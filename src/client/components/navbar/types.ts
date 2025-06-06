export type NavbarProps = {
  onToggleSidebar: () => void;
  sidebarOpen?: boolean;
};

export type UserMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export type NavbarNotificationsProps = {
  notificationCount?: number;
};

export type NavbarUserProps = {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
};
