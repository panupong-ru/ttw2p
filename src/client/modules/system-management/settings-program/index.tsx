'use client';

import { Typography, Box, Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTab } from '@/client/hook/useTab';
import { System } from './system';

function SettingsProgram() {
  const tabs = [{ label: 'ตั้งค่าระบบ', value: 'system', content: <System /> }];

  const { tab, handleChangeTab } = useTab(tabs);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    handleChangeTab(newValue);
  };

  return (
    <Stack
      gap={{ xs: 1, sm: 2 }}
      sx={{
        height: '100%',
        p: { xs: 1, sm: 2 },
      }}
    >
      <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#24237A' }}>
        ตั้งค่าโปรแกรม
      </Typography>

      <Box
        sx={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #0000001f',
          p: { xs: 1, sm: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                {tabs.map((tab) => (
                  <Tab key={`list-${tab.value}`} label={tab.label} sx={{ textTransform: 'none' }} value={tab.value} />
                ))}
              </TabList>
            </Box>

            {tabs.map((tab) => (
              <TabPanel key={`panel-${tab.value}`} sx={{ padding: 0 }} value={tab.value}>
                {tab.content}
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Box>
    </Stack>
  );
}

export { SettingsProgram };
