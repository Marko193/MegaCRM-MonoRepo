import {FunctionComponent, MouseEvent, ReactNode} from 'react';
import {stringAvatar} from '@mega-dev-crm/utilities';
import {Avatar, Grid, Link, Stack, Typography, useTheme} from '@mui/material';

// import {StyledBadge} from './profile-user-card.styles';
import {HandIcon} from '@mega-dev-crm/shared';
// import {useNavigate} from 'react-router';

export interface ProfileUserCardProps {
  isBadge?: boolean;
  name?: string;
  surname?: string;
  position?: string;
  image?: string;
  icon?: boolean;
  imageSize?: number;
  isChildrenBD?: boolean;
  sex?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  showName?: boolean;
  isLink?: boolean;
  id?: number;
  isProfileHeader?: boolean;
  isBalance?: boolean;
  isUserCard?: boolean;
  svgIcon?: ReactNode;
  spacingBetweenColumns?: number;
  circleColor?: string;
  textColor?: string;
  rowDirection?: any;
  justifyContent?: string;
  avatarFontSize?: string | number;
}

export const ProfileUserCard: FunctionComponent<ProfileUserCardProps> = ({
  isBadge = false,
  name = '',
  surname = '',
  position = '',
  image,
  icon,
  imageSize = 40,
  isChildrenBD = false,
  sex = '',
  onClick,
  showName = true,
  isLink = false,
  // id,
  isProfileHeader = false,
  // isBalance = false,
  isUserCard = false,
  // svgIcon,
  // spacingBetweenColumns = 1,
  // circleColor = '',
  textColor = 'text.secondary',
  // rowDirection = 'row',
  // justifyContent = 'space-between',
  avatarFontSize,
}) => {
  const fullName = `${name} ${surname}`;

  const {
    palette: {mode},
  } = useTheme();

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item>
        <Avatar
          {...stringAvatar(fullName, imageSize, 20)}
          src={image}
          onClick={onClick}
        />
      </Grid>

      {showName && (
        <Grid item>
          {isLink && (
            // Todo: This link should be styled and import form `react-router-dom`
            <Link color={mode === 'light' ? 'common.black' : 'common.white'}>
              {fullName}
            </Link>
          )}
          {isProfileHeader && (
            <Typography color='common.white' variant='h1'>
              {name} {surname}
            </Typography>
          )}
          {isUserCard && (
            <Stack>
              <Typography color='text.primary' variant='h4'>
                {name} {surname}
              </Typography>
              <Typography color={textColor} variant='body2'>
                {position}
              </Typography>
            </Stack>
          )}
        </Grid>
      )}

      {/* {isChildrenBD && (
        <Stack>
          <Typography color='text.secondary' variant='body2' fontWeight='bold'>
            {name} {surname}
          </Typography>
          <Typography color='text.primary' variant='h4'>
            {position}
          </Typography>
        </Stack>
      )} */}
      {icon && <HandIcon />}
    </Grid>
  );
};
