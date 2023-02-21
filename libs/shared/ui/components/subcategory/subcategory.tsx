import {FunctionComponent, ReactNode} from 'react';
import {Stack, Typography, useTheme} from '@mui/material';

export interface SubCategoryProps {
  title: string;
  children: ReactNode;
  mt?: number;
}

export const SubCategory: FunctionComponent<SubCategoryProps> = ({
  title,
  children,
  mt = 2,
}) => {
  const {
    spacing,
    palette: {mode},
  } = useTheme();
  return (
    <Stack
      mt={spacing(mt)}
      p={spacing(2, 2, 1.5)}
      boxShadow='0px 4px 5px rgba(0, 0, 0, 0.1)'
      borderRadius={spacing(1)}
      bgcolor={mode === 'light' ? 'common.white' : 'secondary.dark'}>
      <Typography variant='subtitle2'>{title}</Typography>
      {children}
    </Stack>
  );
};
