import { useState, Fragment, FunctionComponent, ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Collapse,
  ListItemText,
  List,
  Box,
  ListItemButton,
} from '@mui/material';

import {
  ListItemIconStyle,
  activeRootStyle,
  ListItemStyle,
} from './nav-item-style';

import { useTheme } from '@mui/material/styles';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListParentItem } from './list-parent-item';
import { ListChildItem } from './list-child-item';
import { useTranslation } from 'react-i18next';

export interface INavItem {
  title: string;
  icon?: ReactNode;
  path?: string;
  children?: INavItemChild[];
}

export interface INavItemChild {
  title: string;
  path?: string;
  children?: {
    title: string;
    path: string;
  }[];
}

interface IDeepedNavItem {
  item: INavItem;
  active: (path: string) => boolean;
}

export const NavItem: FunctionComponent<IDeepedNavItem> = ({
  item,
  active,
}) => {
  const theme = useTheme();

  const isActiveRoot = active(item.path || '');
  const { path, icon, children } = item;
  const [open, setOpen] = useState<boolean>(isActiveRoot);
  const [childOpen, setChildOpen] = useState<boolean>(isActiveRoot);

  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSubOpen = () => {
    setChildOpen((prev) => !prev);
  };

  if (children) {
    return (
      <>
        <ListParentItem
          item={item}
          theme={theme}
          isActiveRoot={isActiveRoot}
          open={open}
          handleOpen={handleOpen}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: INavItemChild) => {
              const { title, path, children } = item;
              const isActiveSub = active(path || '');
              if (children) {
                return (
                  <Fragment key={title}>
                    <ListItemButton
                      disableGutters
                      key={title}
                      onClick={handleSubOpen}
                      sx={{
                        ...(isActiveRoot && activeRootStyle(theme)),
                      }}
                    >
                      <ListItemIconStyle>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            display: 'flex',
                            borderRadius: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'orange',
                            transition: (theme) =>
                              theme.transitions.create('transform'),
                            ...(isActiveSub && {
                              transform: 'scale(2)',
                              bgcolor: 'primary.main',
                            }),
                          }}
                        />
                      </ListItemIconStyle>
                      <ListItemText disableTypography>{t(title)}</ListItemText>
                      {childOpen ? (
                        <ExpandLess sx={{ width: 16, height: 16, ml: 1 }} />
                      ) : (
                        <ExpandMore sx={{ width: 16, height: 16, ml: 1 }} />
                      )}
                    </ListItemButton>

                    <Collapse in={childOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {children.map((item: INavItemChild) => {
                          const { path, title } = item;
                          const isActiveSub = active(path || '');
                          return (
                            <ListChildItem
                              key={title}
                              theme={theme}
                              isActiveSub={isActiveSub}
                              item={item}
                              isChild={true}
                            />
                          );
                        })}
                      </List>
                    </Collapse>
                  </Fragment>
                );
              }
              return (
                <ListChildItem
                  key={item.title}
                  theme={theme}
                  isActiveSub={isActiveSub}
                  item={item}
                  isChild={false}
                />
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle(theme)),
      }}
    >
      <ListItemIconStyle>{icon}</ListItemIconStyle>
      <ListItemText disableTypography>{t(item.title)}</ListItemText>
    </ListItemStyle>
  );
};
