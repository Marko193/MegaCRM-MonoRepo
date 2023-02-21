/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {FunctionComponent, ReactNode} from 'react';
import {Button, Grid, useTheme} from '@mui/material';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import {ProfileUserCard} from '../profile-user-card/profile-user-card';
// import {useNavigate, useParams} from 'react-router';
// import { stringAvatar } from '@mega-dev-crm/utilities';

export interface ProfileHeaderProps {
  firstName?: string;
  lastName?: string;
  position?: string;
  avatar?: string;
  coverImg: string;
  children: ReactNode;
}

export const ProfileHeader: FunctionComponent<ProfileHeaderProps> = ({
  firstName,
  lastName,
  position,
  avatar,
  coverImg,
  children,
}) => {
  const {
    spacing,
    palette: {mode},
  } = useTheme();
  const {t} = useTypedTranslation(nameSpaces.common);
  // const {id} = useParams();
  // const navigate = useNavigate();

  return (
    <Grid
      container
      direction='column'
      bgcolor={mode === 'light' ? 'common.white' : 'secondary.dark'}
      borderRadius={spacing(1)}>
      <Grid item height='208px'>
        <img
          src={coverImg}
          alt='Header background img'
          data-testid='profileHeader-background'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Grid>
      <Grid
        container
        flexWrap='initial'
        alignItems='center'
        gap={3}
        width='initial'
        mt='-107px'
        ml='81px'>
        <ProfileUserCard
          name={firstName}
          surname={lastName}
          imageSize={150}
          position={position}
          image={avatar}
          showName
          isProfileHeader
          textColor='common.white'
          avatarFontSize={50}
        />
      </Grid>
      <Grid
        container
        justifyContent='flex-end'
        alignItems='center'
        gap={3}
        p={spacing(4, 5, 0, 0)}
        mt='-60px'>
        <Grid item>{children}</Grid>
        <Grid item>
          <Button sx={{textTransform: 'none'}}>
            {t('categoryNames.edit.profile')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
