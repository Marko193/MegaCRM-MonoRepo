import { styled, alpha } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

export const ListItemStyle: any = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2.5),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const activeRootStyle = (theme: any) => ({
  bgcolor: alpha(
    theme.palette.primary.main,
    theme.palette.action.selectedOpacity
  ),
  '&:before': { display: 'block' },
});
