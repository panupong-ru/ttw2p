export type SidebarProps = {
  open: boolean;
  onCloseAction: () => void;
};

export type MenuItemType = {
  text: string;
  icon: React.ReactNode;
  href: string;
  subItems?: MenuItemType[];
  isOpen?: boolean;
};

export type MenuCategoryType = {
  title: string;
  items: MenuItemType[];
};

export type SidebarHeaderProps = {
  open: boolean;
  onCloseAction: () => void;
};

export type SidebarMenuProps = {
  open: boolean;
  menuCategories: MenuCategoryType[];
  pathname: string;
};
