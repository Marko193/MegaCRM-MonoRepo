import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export const StyledBadge = styled(Badge)(({ theme: { palette } }) => ({
  '& .MuiBadge-badge': {
    width: 14,
    height: 19,
    backgroundColor: palette.success.light,
    borderRadius: '50%',
    boxShadow: `0 0 0 2px ${palette.background.paper}`,
    color: 'black',
  },
}));
