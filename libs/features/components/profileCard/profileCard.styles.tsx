import {styled} from '@mui/material';

export const ChipItem = styled('div')(({theme}) => ({
  padding: '0 3px',
  minWidth: '28px',
  height: '28px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#5977E6' : '#FFEBCD',
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));
