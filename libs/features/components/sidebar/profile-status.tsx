import {FunctionComponent} from 'react';
import {HandIcon} from '@mega-dev-crm/shared';
// import { stringAvatar } from '@mega-dev-crm/utilities';
import {Box, Avatar, Typography} from '@mui/material';

interface IProfileCard {
  firstName?: string;
  lastName?: string;
}

export const ProfileStatus: FunctionComponent<IProfileCard> = ({
  firstName = 'Andrew',
  lastName = 'Marushko',
}) => {
  return (
    <Box gap={1} display='flex' alignItems='center' mx={1} p={1}>
      <Avatar>{`${firstName} ${lastName}`}</Avatar>
      <Box></Box>
      <Box>
        <Typography variant='subtitle2'>
          {firstName} {lastName}
        </Typography>
        <Typography variant='body2'>FrontEnd</Typography>
      </Box>
      <Box>
        <HandIcon />
      </Box>
    </Box>
  );
};
