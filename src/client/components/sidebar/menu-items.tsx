'use client';

import { Apps, Person, Description, Calculate, Group, Visibility } from '@mui/icons-material';
import { MenuCategoryType } from './types';
import { ROUTE } from '@/core/constants/route';
export const MENU_CATEGORIES: MenuCategoryType[] = [
  {
    title: '',
    items: [{ text: 'Dashboard', icon: <Apps />, href: ROUTE.HOME }],
  },
  {
    title: 'เมนู',
    items: [
      {
        text: 'รายงานตัว',
        icon: <Person />,
        href: '',
        subItems: [
          { text: 'จัดการผู้ใช้', icon: <Group />, href: '' },
          { text: 'ดูข้อมูล', icon: <Visibility />, href: '' },
        ],
        isOpen: false,
      },
      { text: 'ประวัติการยื่นกู้', icon: <Description />, href: '' },
      { text: 'คำนวณเงินกู้', icon: <Calculate />, href: '' },
    ],
  },
];
