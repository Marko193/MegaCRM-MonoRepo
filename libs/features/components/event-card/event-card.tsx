/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {FunctionComponent, ReactNode, useState} from 'react';
import {
  alpha,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  ClickAwayListener,
  Grid,

  // Avatar,
  // MenuItem,
  SvgIcon,
  Typography,
  useTheme,
  // MenuItem,
  // Paper,
  // Stack,
  // SvgIcon,
  // Typography,
  // useTheme,
} from '@mui/material';
import {PopupCard} from '@mega-dev-crm/shared';

// import {PopupCard, ProfileUserCard} from '@mega-dev-crm/shared';

// import dayjs from 'dayjs';

// import {useTypedTranslation} from 'libs/features/hooks';
// import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import {PopupCard, ProfileUserCard} from '@mega-dev-crm/shared';
// import {alpha} from '@material-ui/core';
// import {UserInterface} from '@mega-dev-crm/data-access';
// import {ChildInterface} from '../../store/employees/employees-interfaces';
// import {useTypedTranslation} from '../../hooks';
// import {nameSpaces} from '../../localization/typedNameSpaces';
// import dayjs from 'dayjs';

export interface EventCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  smallIcon?: ReactNode;
  list: Array<any>;
  childrenList: Array<any>;
  isBirthdays?: boolean;
  isAnniversary?: boolean;
  isChildrenBirthdays?: boolean;
}

export const EventCard: FunctionComponent<EventCardProps> = ({
  title,
  count,
  icon,
  smallIcon,
  list,
  childrenList,
  isBirthdays = false,
  isAnniversary = false,
  isChildrenBirthdays = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {palette} = useTheme();

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setIsPopupOpen(false);
  };
  // const getAge = (birthday: string) => {
  //   const month_diff = Date.now() - new Date(birthday).getTime();
  //   const year = new Date(month_diff).getUTCFullYear();
  //   return Math.abs(year - 1970);
  // };

  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      touchEvent='onTouchStart'
      onClickAway={handleClickAway}>
      <Grid item md={12} position={'relative'}>
        <Card onClick={handlePopup}>
          <CardActionArea>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Avatar
                    sx={{
                      width: '65px',
                      height: '65px',
                      bgcolor: alpha(palette.text.secondary, 0.12),
                    }}>
                    <SvgIcon inheritViewBox>{icon}</SvgIcon>
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography color='text.secondary' variant='h2'>
                    {title}
                  </Typography>
                  <Typography color='text.primary' variant='overline'>
                    {count}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
        {isPopupOpen ? <PopupCard /> : null}
      </Grid>
    </ClickAwayListener>
  );
};
