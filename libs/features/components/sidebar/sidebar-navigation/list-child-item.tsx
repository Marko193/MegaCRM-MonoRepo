import { ListItemText, Box } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { INavItem } from './sidebar-nav-item';
import {
  activeRootStyle,
  ListItemIconStyle,
  ListItemStyle,
} from './nav-item-style';

interface IListChildItem {
  theme: any;
  isActiveSub: boolean;
  isChild: boolean;
  item: INavItem;
}

export const ListChildItem: FunctionComponent<IListChildItem> = ({
  theme,
  isActiveSub,
  isChild = true,
  item: { title, path },
}) => {
  const { t } = useTranslation();

  return (
    <ListItemStyle
      key={title}
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveSub && activeRootStyle(theme)),
        pl: isChild ? 5 : 1,
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
            transition: (theme: any) => theme.transitions.create('transform'),
            ...(isActiveSub && {
              transform: 'scale(2)',
              bgcolor: 'orange',
            }),
          }}
        />
      </ListItemIconStyle>
      <ListItemText disableTypography>{t(title)}</ListItemText>
    </ListItemStyle>
  );
};
