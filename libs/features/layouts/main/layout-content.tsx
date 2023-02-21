import {FunctionComponent} from 'react';
import {Box, Stack, Toolbar} from '@mui/material';
import {Outlet} from 'react-router-dom';

export const LayoutContent: FunctionComponent = () => {
  return (
    <Box
      component='main'
      sx={{
        width: '100%',
      }}>
      <Toolbar />
      <Stack my={6} mx={4}>
        <Outlet />
      </Stack>
    </Box>
  );
};
