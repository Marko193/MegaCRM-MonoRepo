import { Card, styled, Typography } from '@mui/material';

export const ContentStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: '90vh',
  maxWidth: '464px',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  borderRadius: '16px',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.65rem',
  fontWeight: '700',
  padding: theme.spacing(0, 5, 0, 5),
  marginTop: '80px',
  marginBottom: '40px',
}));
