import {FunctionComponent, ReactNode, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/material';

import {PrimaryNavBar} from 'libs/features/components/navbar/navbar';
import {Sidebar} from 'libs/features/components/sidebar/sidebar';
import {useAppSelector} from 'libs/features/hooks';
import {AUTH_COMPANY} from 'libs/features/constants';
import {LayoutContent} from './layout-content';

export interface INavItemChild {
  title: string;
  path?: string;
  children?: {
    title: string;
    path: string;
  }[];
}
export interface INavItem {
  title: string;
  icon?: ReactNode;
  path?: string;
  children?: INavItemChild[];
}

interface Props {
  config: INavItem[];
}

const drawerWidth = 240;

export const MainLayout: FunctionComponent<Props> = ({config}) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = useAppSelector((state) => state.userReducer.accessToken);

  useEffect(() => {
    if (!token) {
      navigate(AUTH_COMPANY);
    }
    return () => {};
  }, [token]);

  const handleLogout = () => {};
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display='flex'>
      <PrimaryNavBar
        handleLogout={handleLogout}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        config={config}
      />

      <LayoutContent />
    </Box>
  );
};

// <LayoutContent />
