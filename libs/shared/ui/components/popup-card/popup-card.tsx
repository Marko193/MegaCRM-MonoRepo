import {
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {BirthdayCakeIcon, ProfileUserCard} from '@mega-dev-crm/shared';
import {FunctionComponent, ReactNode} from 'react';

export interface PopupCardProps {
  title: string;
  icon: ReactNode;
  children?: ReactNode;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  id: string | undefined;
}

export const PopupCard: FunctionComponent<any> = () => {
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        left: 0,
        zIndex: 2,
        height: 'auto',
        paddingTop: '10px',
        backgroundColor: ({palette}) =>
          palette.mode === 'light'
            ? palette.secondary.contrastText
            : palette.primary.main,
        overflow: 'hidden',
      }}>
      <Grid container>
        <Grid item container xs={12} md={12} justifyContent={'center'}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='subtitle2' color={'secondary.lighter'}>
              Birthday list
            </Typography>
            <BirthdayCakeIcon width={17} height={19} />
          </Stack>
        </Grid>
        <Grid item container xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <MenuList>
              <MenuItem>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{width: '100%'}}>
                  <ProfileUserCard
                    name='Andrew'
                    surname='Marushko'
                    position='Team Lead'
                    showName
                    isUserCard
                  />
                  <Typography variant='h3'>24/56</Typography>
                </Stack>
              </MenuItem>
              <MenuItem>
                <ProfileUserCard
                  name='Andrew'
                  surname='Marushko'
                  position='Team Lead'
                  showName
                  isUserCard
                />
                <Typography variant='h3'>24/56</Typography>
              </MenuItem>
              <MenuItem>
                <ProfileUserCard
                  name='Andrew'
                  surname='Marushko'
                  position='Team Lead'
                  showName
                  isUserCard
                />
                <Typography variant='h3'>24/56</Typography>
              </MenuItem>
              <MenuItem>
                <ProfileUserCard
                  name='Andrew'
                  surname='Marushko'
                  position='Team Lead'
                  showName
                  isUserCard
                />
                <Typography variant='h3'>24/56</Typography>
              </MenuItem>
              <MenuItem>
                <ProfileUserCard
                  name='Andrew'
                  surname='Marushko'
                  position='Team Lead'
                  showName
                  isUserCard
                />
                <Typography variant='h3'>24/56</Typography>
              </MenuItem>
              <MenuItem>
                <ProfileUserCard
                  name='Andrew'
                  surname='Marushko'
                  position='Team Lead'
                  showName
                  isUserCard
                />
                <Typography variant='h3'>24/56</Typography>
              </MenuItem>
            </MenuList>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
