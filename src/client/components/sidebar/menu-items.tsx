'use client';

import { Person, Group, Visibility } from '@mui/icons-material';
import type { MenuCategoryType } from './types';
import { ROUTE } from '@/core/constants/route';
export const MENU_CATEGORIES: MenuCategoryType[] = [
  // {
  //   title: '',
  //   items: [{ text: 'Dashboard', icon: <Apps />, href: ROUTE.HOME }],
  // },
  {
    title: 'เมนู',
    items: [
      {
        text: 'ข้อมูล',
        icon: <Person />,
        href: '',
        subItems: [
          { text: 'ข้อมูลประเภทชั่ง', icon: <Group />, href: ROUTE.MASTER_DATA.WEIGHT_TYPE },
          { text: 'ข้อมูลคู่ค้า', icon: <Visibility />, href: ROUTE.MASTER_DATA.CUSTOMER },
          { text: 'ข้อมูลสินค้า', icon: <Visibility />, href: ROUTE.MASTER_DATA.PRODUCT },
          { text: 'ข้อมูลผู้ขนส่ง', icon: <Visibility />, href: ROUTE.MASTER_DATA.TRANSPORTER },
          { text: 'ข้อมูลพนักงานขับรถ', icon: <Visibility />, href: ROUTE.MASTER_DATA.DRIVER },
          { text: 'ข้อมูลบัตร RFID', icon: <Visibility />, href: ROUTE.MASTER_DATA.RFID_TAG },
          { text: 'ข้อมูลรถบรรทุก', icon: <Visibility />, href: ROUTE.MASTER_DATA.TRUCK },
          { text: 'ข้อมูลหน่วยราคา', icon: <Visibility />, href: ROUTE.MASTER_DATA.WEIGHT_UNIT },
          { text: 'ข้อมูลรถค้างชั่ง', icon: <Visibility />, href: '' },
          { text: 'ข้อมูลชั่งน้ำหนัก', icon: <Visibility />, href: '' },
        ],
        isOpen: false,
      },
      {
        text: 'รายงาน',
        icon: <Person />,
        href: '',
        subItems: [
          { text: 'รายงานประเภทชั่ง', icon: <Group />, href: '' },
          { text: 'รายงานคู่ค้า', icon: <Visibility />, href: '' },
          { text: 'รายงานสินค้า', icon: <Visibility />, href: '' },
          { text: 'รายงานผู้ขนส่ง', icon: <Visibility />, href: '' },
          { text: 'รายงานพนักงานขับรถ', icon: <Visibility />, href: '' },
          { text: 'รายงานบัตร RFID', icon: <Visibility />, href: '' },
          { text: 'รายงานรถบรรทุก', icon: <Visibility />, href: '' },
          { text: 'รายงานหน่วยราคา', icon: <Visibility />, href: '' },
          { text: 'รายงานรูปแบบรายงาน', icon: <Visibility />, href: '' },
          { text: 'รายงานผู้ใช้โปรแกรม', icon: <Visibility />, href: '' },
          { text: 'รายงานชั่งน้ำหนัก', icon: <Visibility />, href: '' },
        ],
        isOpen: false,
      },
      {
        text: 'จัดการระบบ',
        icon: <Person />,
        href: '',
        subItems: [
          {
            text: 'จัดการฐานข้อมูล',
            icon: <Visibility />,
            href: '',
            subItems: [
              { text: 'สำรองข้อมูล', icon: <Visibility />, href: '' },
              { text: 'นำข้อมูลสำรองกลับมาใช้', icon: <Visibility />, href: '' },
              { text: 'ลบข้อมูล', icon: <Visibility />, href: '' },
            ],
          },
          { text: 'ข้อมูลรูปแบบรายงาน', icon: <Visibility />, href: '' },
          { text: 'ข้อมูลผู้ใช้โปรแกรม', icon: <Visibility />, href: '' },
          { text: 'ออกแบบรายงาน', icon: <Visibility />, href: '' },
          { text: 'ตั้งค่าบริษัท', icon: <Visibility />, href: '' },
          { text: 'ตั้งค่าเครื่องชั่ง', icon: <Visibility />, href: '' },
          { text: 'ตั้งค่าโปรแกรม', icon: <Visibility />, href: '' },
          { text: 'การใช้งานโปรแกรม', icon: <Visibility />, href: '' },
          { text: 'เปลี่ยนรหัสผ่าน', icon: <Visibility />, href: '' },
        ],
        isOpen: false,
      },
      {
        text: 'ช่วยเหลือ',
        icon: <Person />,
        href: '',
        subItems: [
          { text: 'คู่มือการใช้งาน', icon: <Visibility />, href: '' },
          { text: 'เกี่ยวกับโปรแกรม', icon: <Visibility />, href: '' },
        ],
        isOpen: false,
      },
    ],
  },
];
