import { FunctionComponent } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemText, ListItemButton } from '@mui/material';
import { ListItemIconStyle } from './nav-item-style';
import { INavItem } from '@mega-dev-crm/features';

interface IListParentItem {
  theme: any;
  isActiveRoot: boolean;
  open: boolean;
  handleOpen: () => void;
  item: INavItem;
}

export const ListParentItem: FunctionComponent<IListParentItem> = ({
  theme,
  isActiveRoot,
  open,
  handleOpen,
  item: { title, icon },
}) => {
  return (
    <ListItemButton onClick={handleOpen} selected={!isActiveRoot}>
      <ListItemIconStyle>{icon}</ListItemIconStyle>
      <ListItemText disableTypography>{title}</ListItemText>
      {open ? (
        <ExpandLess sx={{ width: 16, height: 16, ml: 1 }} />
      ) : (
        <ExpandMore sx={{ width: 16, height: 16, ml: 1 }} />
      )}
    </ListItemButton>
  );
};
