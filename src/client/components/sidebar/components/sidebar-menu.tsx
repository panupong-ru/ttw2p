'use client';

import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, useTheme, Typography, Box, Collapse } from '@mui/material';
import Link from 'next/link';
import { SidebarMenuProps, MenuItemType } from '../types';
import { CustomListItemButton } from '../styles';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MENU_TITLE_COLOR } from '../constants';

export default function SidebarMenu({ open, menuCategories, pathname }: SidebarMenuProps) {
  const theme = useTheme();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (itemText: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  const renderMenuItem = (item: MenuItemType, isSubmenu = false) => {
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedMenus[item.text] || false;

    // For items with subitems (parent items)
    if (hasSubItems) {
      return (
        <Box key={item.text} sx={{ mb: 1 }}>
          <ListItem
            disablePadding
            sx={{
              display: 'block',
              pl: isSubmenu && open ? 2 : 0,
              transition: theme.transitions.create(['margin', 'padding'], {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          >
            <CustomListItemButton
              active={isActive ? 1 : 0}
              sidebarOpen={open}
              onClick={() => toggleSubmenu(item.text)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
                py: 1.2,
                transition: theme.transitions.create(['padding', 'justify-content', 'min-height'], {
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  transition: theme.transitions.create('margin-right', {
                    duration: theme.transitions.duration.standard,
                  }),
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.standard,
                  }),
                  whiteSpace: 'nowrap',
                }}
              />
              {open && hasSubItems && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
            </CustomListItemButton>
          </ListItem>
          {/* Submenu items in a separate List outside the parent ListItem */}
          {open && hasSubItems && (
            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
              <List component='div' disablePadding sx={{ pl: isSubmenu ? 2 : 0 }}>
                {item.subItems?.map((subItem) => renderMenuItem(subItem, true))}
              </List>
            </Collapse>
          )}
        </Box>
      );
    }

    // For items without subitems (leaf items)
    return (
      <ListItem
        key={item.text}
        disablePadding
        sx={{
          display: 'block',
          mb: 1,
          pl: isSubmenu && open ? 2 : 0,
          transition: theme.transitions.create(['margin', 'padding'], {
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        <Link href={item.href} style={{ textDecoration: 'none' }}>
          <CustomListItemButton
            active={isActive ? 1 : 0}
            sidebarOpen={open}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              py: 1.2,
              transition: theme.transitions.create(['padding', 'justify-content', 'min-height'], {
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center',
                transition: theme.transitions.create('margin-right', {
                  duration: theme.transitions.duration.standard,
                }),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                transition: theme.transitions.create('opacity', {
                  duration: theme.transitions.duration.standard,
                }),
                whiteSpace: 'nowrap',
              }}
            />
          </CustomListItemButton>
        </Link>
      </ListItem>
    );
  };

  return (
    <>
      {menuCategories.map((category, index) => (
        <Box key={`category-${index}`}>
          {open && (
            <Box sx={{ px: 3 }}>
              <Typography
                variant='body2'
                sx={{
                  color: MENU_TITLE_COLOR,
                  fontWeight: 'medium',
                  fontSize: '14px',
                }}
              >
                {category.title}
              </Typography>
            </Box>
          )}
          <List
            sx={{
              px: 0,
              pt: open ? 0.5 : index === 0 ? 2 : 1,
              pb: 1,
              transition: theme.transitions.create('padding', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            {category.items.map((item) => renderMenuItem(item))}
          </List>
        </Box>
      ))}
    </>
  );
}
