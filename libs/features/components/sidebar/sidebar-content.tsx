import {FunctionComponent} from 'react';
import {List, Drawer, Toolbar, useTheme, Grid} from '@mui/material';
import {INavItem, useMobile} from '@mega-dev-crm/features';
import {
  LogoIcon,
  Fab,
  RequestsIcon,
  SelfPhoneIcon,
  ProfileUserCard,
} from '@mega-dev-crm/shared';
import {NavSection} from './sidebar-navigation/sidebar-items';
// import {UserInterface} from '@mega-dev-crm/data-access';

interface ISidebarContent {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
  config: INavItem[];
}

export const SidebarContent: FunctionComponent<ISidebarContent> = ({
  drawerWidth,
  open,
  onClose,
  config,
}) => {
  const isMobile = useMobile();
  const {
    palette: {text},
    spacing,
  } = useTheme();

  const actions = [
    {icon: <RequestsIcon />, name: 'Add request'},
    {icon: <SelfPhoneIcon />, name: 'Create Meeting'},
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        display: !isMobile
          ? {xs: 'none', sm: 'block'}
          : {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}>
      <Toolbar>
        <LogoIcon color={text.primary} />
      </Toolbar>

      <Grid pl={spacing(3)}>
        <ProfileUserCard
          name={'Andrew'}
          surname={'Marushko'}
          showName
          icon
          position='FrontEnd'
          isUserCard
        />
      </Grid>

      <Grid>
        <List>
          <NavSection navConfig={config} />
        </List>

        <Fab actions={actions} />
      </Grid>
    </Drawer>
  );
};
