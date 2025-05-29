'use client';

import { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '@/client/components/navbar';
import Sidebar from '@/client/components/sidebar';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!mounted) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box component='main' sx={{ flexGrow: 1, width: '100%', bgcolor: '#F8F9FA' }}>
          {children}
        </Box>
      </Box>
    );
  }

  const drawerWidth = sidebarOpen ? 240 : 70;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />

      <Box
        component='aside'
        sx={{
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          height: '100vh',
          bgcolor: 'background.default',
          transition: (theme) =>
            theme.transitions.create(['width', 'margin-left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <Box
          sx={{
            p: { xs: 1, md: 2 },
            flexGrow: 1,
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
