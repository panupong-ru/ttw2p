'use client';
import { thTH } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

// เพิ่ม interface สำหรับขยาย theme palette
declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TypeBackground {
    lightBg?: string; // เพิ่มคุณสมบัตินี้ใน TypeBackground
    sidebar?: string; // เพิ่มสีพื้นหลังของ sidebar
  }
}

export const muiTheme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 480,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    cssVariables: true,
    palette: {
      mode: 'light',
      primary: {
        main: '#128C45',
        light: '#4CAF50',
        dark: '#0b5d2e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#504f94',
        main: '#24237A',
        dark: '#191855',
        contrastText: '#fff',
      },
      error: {
        light: '#ff6c67',
        main: '#FF4842',
        dark: '#b2322e',
        contrastText: '#fff',
      },
      success: {
        main: '#1e8e4f',
        light: '#43a16f',
        dark: '#156338',
        contrastText: '#fff',
      },
      background: {
        default: '#F8F9FA',
        paper: '#ffffff',
        lightBg: '#f5f9ff',
        sidebar: '#128C45',
      },
    },
    typography: {
      fontFamily: `var(--font-sarabun)`,
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            margin: 0,
            padding: 0,
            height: '100%',
            overflow: 'hidden',
          },
          '#root, #__next': {
            height: '100%',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            textTransform: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            position: 'relative',
            zIndex: 10,
            height: '100%',
          },
          paper: {
            position: 'static',
            height: '100%',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(18, 140, 69, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(18, 140, 69, 0.2)',
              },
            },
          },
        },
      },
    },
  },
  thTH
);
