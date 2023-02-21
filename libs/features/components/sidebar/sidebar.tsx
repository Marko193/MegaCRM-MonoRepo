import {FunctionComponent} from 'react';
import {Box} from '@mui/material';
import {INavItem} from '@mega-dev-crm/features';
import {SidebarContent} from './sidebar-content';
// import {UserInterface} from '@mega-dev-crm/data-access';

interface ISidebar {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  config: INavItem[];
}

export const Sidebar: FunctionComponent<ISidebar> = ({
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
  config,
}) => {
  return (
    <Box
      component='nav'
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
      aria-label='mailbox folders'>
      <SidebarContent
        drawerWidth={drawerWidth}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        config={config}
      />
    </Box>
  );
};
