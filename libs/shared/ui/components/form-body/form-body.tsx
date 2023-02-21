import {FunctionComponent, ReactNode} from 'react';
import {Grid, Stack} from '@mui/material';

export interface FormBodyContainerProps {
  children: ReactNode;
}

export const FormBodyContainer: FunctionComponent<FormBodyContainerProps> = ({
  children,
}) => {
  return (
    <Grid container direction='column'>
      <Stack spacing={1}>{children}</Stack>
    </Grid>
  );
};
