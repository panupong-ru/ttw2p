import { Apps, Person } from '@mui/icons-material';
import type { MenuCategoryType } from './types';

export const MENU_CATEGORIES_COLLAPSED: MenuCategoryType[] = [
  {
    title: '',
    items: [
      { text: 'Register', icon: <Person />, href: '' },
      { text: 'ข้อมูล', icon: <Person />, href: '' },
      { text: 'รายงาน', icon: <Apps />, href: '' },
      { text: 'จัดการระบบ', icon: <Person />, href: '' },
      { text: 'ช่วยเหลือ', icon: <Person />, href: '' },
    ],
  },
];
