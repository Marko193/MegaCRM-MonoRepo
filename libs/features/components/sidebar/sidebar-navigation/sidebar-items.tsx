import {FunctionComponent} from 'react';
// import {matchPath, useLocation} from 'react-router-dom';
import {Box} from '@mui/material';
import {INavItem} from '@mega-dev-crm/features';
// import {NavItem} from './sidebar-nav-item';

interface INavSection {
  navConfig: INavItem[];
}

export const NavSection: FunctionComponent<INavSection> = ({navConfig}) => {
  console.log(navConfig);
  // const {pathname} = useLocation();
  // const match = (path: string) =>
  //   path ? !!matchPath({ path, end: true }, pathname) : false;

  return (
    <Box>
      {/* <List disablePadding>
        {navConfig.map((item: INavItem) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List> */}
      lol
    </Box>
  );
};
