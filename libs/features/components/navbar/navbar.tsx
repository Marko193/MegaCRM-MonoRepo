import {FunctionComponent, useState, MouseEvent} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  useTheme,
  Stack,
} from '@mui/material';
import {Menu as MenuIcon, Search, Notifications} from '@mui/icons-material';

import {SearchIcon, SearchIconWrapper, StyledInputBase} from './navbar.styles';
import {LanguagePopover} from './language-menu';
import {SwitchMode} from './switch-mode';
// import {UserInterface} from '@mega-dev-crm/data-access';
import {ProfileUserCard} from '@mega-dev-crm/shared';

interface IPrimaryNavBar {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  handleLogout: () => void;
}

export const PrimaryNavBar: FunctionComponent<IPrimaryNavBar> = ({
  drawerWidth,
  handleDrawerToggle,
  handleLogout,
}) => {
  const {palette, spacing} = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <Badge badgeContent={17} color='error'>
          <Notifications />
        </Badge>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <ProfileUserCard
          name='Andrew'
          surname='Marushko'
          onClick={handleProfileMenuOpen}
          isUserCard
        />
      </MenuItem>
    </Menu>
  );

  return (
    <Box data-testid='navbar' sx={{flexGrow: 1}}>
      <AppBar
        position='fixed'
        color='secondary'
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{mr: 2, display: {sm: 'none'}}}
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <SearchIcon>
            <SearchIconWrapper>
              <Search sx={{zIndex: '1', color: palette.common.black}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search...'
              inputProps={{'aria-label': 'search'}}
            />
          </SearchIcon>
          <SwitchMode />
          <Box sx={{flexGrow: 1}} />
          <Stack
            justifyContent='space-between'
            flexDirection='row'
            alignItems='center'
            gap='10px'>
            <LanguagePopover />

            <Badge badgeContent={17} color='error' sx={{mr: spacing(1)}}>
              <Notifications />
            </Badge>
            <ProfileUserCard
              name={'Andrew'}
              surname={'Marushko'}
              onClick={handleProfileMenuOpen}
              isUserCard
            />
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
