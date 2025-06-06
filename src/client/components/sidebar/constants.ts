'use client';

import { muiTheme } from '@/app/mui-theme';

// Sidebar dimensions
export const DRAWER_WIDTH = 300;
export const COLLAPSED_DRAWER_WIDTH = 56;

// Sidebar colors - ใช้สีจาก MUI Theme
export const DRAWER_BACKGROUND_COLOR = muiTheme.palette.background.sidebar;
export const DRAWER_WHITE_BACKGROUND = muiTheme.palette.background.paper;
export const DRAWER_ACTIVE_COLOR = muiTheme.palette.primary.main;
export const DRAWER_HOVER_COLOR = 'rgba(255, 255, 255, 0.15)';
export const ADD_BUTTON_COLOR = muiTheme.palette.primary.light;
export const MENU_TITLE_COLOR = muiTheme.palette.text.secondary;

// Text colors
export const TEXT_DARK = muiTheme.palette.text.primary;
export const TEXT_LIGHT = '#fff'; // White text for dark backgrounds
