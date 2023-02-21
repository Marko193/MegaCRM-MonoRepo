import {FunctionComponent, ReactNode} from 'react';
// import {ContentStyle} from './auth-layout-content.styles';
import {Box, Stack, useTheme} from '@mui/material';

interface IAuthLayoutContent {
  logo: ReactNode;
  image: string;
}

export const AuthLayoutContent: FunctionComponent<IAuthLayoutContent> = ({
  logo,
  image,
}) => {
  const {spacing} = useTheme();

  return (
    <Stack
      sx={{
        display: {xs: 'none', md: 'flex'},
        width: '100%',
        height: '100%',
      }}>
      <Box component='a' href='https://mega-hub.io/' p={spacing(3, 0, 0, 2)}>
        {logo}
      </Box>
      <Stack justifyContent='center' height='100%'>
        <img src={image} alt='Company image' />
      </Stack>
    </Stack>
  );
};
