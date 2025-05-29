export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface MenuItemType {
  text: string;
  icon: React.ReactNode;
  href: string;
  subItems?: MenuItemType[];
  isOpen?: boolean;
}

export interface MenuCategoryType {
  title: string;
  items: MenuItemType[];
}

export interface SidebarHeaderProps {
  open: boolean;
  onClose: () => void;
}

export interface SidebarMenuProps {
  open: boolean;
  menuCategories: MenuCategoryType[];
  pathname: string;
}
