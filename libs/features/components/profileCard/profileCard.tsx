import {FunctionComponent} from 'react';
import {
  Button,
  CardActions,
  CardHeader,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {
  ProfileUserCard,
  EventStatuses,
  statusIcons,
} from '@mega-dev-crm/shared';
import {AbsenceType} from './components/absenceType';
import {ChipItem} from './profileCard.styles';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import dayjs from 'dayjs';

export interface ItemType {
  id: number;
  user_name?: string;
  user_surname?: string;
  reviewer_position?: string;
  start_date?: string;
  end_date?: string;
  type: EventStatuses;
  total?: string;
  avatar?: string;
  daysBalance: number;
  status: string;
}

interface ProfileCardProps {
  item: ItemType;
  isBadge?: boolean;
  isActions?: boolean;
  acceptHandler?: () => void;
  declineHandler?: () => void;
}

export const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  item,
  isBadge = false,
  isActions = false,
  acceptHandler,
  declineHandler,
}) => {
  const {
    user_name,
    reviewer_position,
    user_surname,
    end_date,
    type,
    avatar,
    daysBalance,
    start_date,
  } = item;

  const {t} = useTypedTranslation(nameSpaces.common);
  const {
    palette: {mode},
  } = useTheme();

  const acceptHandle = () => {
    if (acceptHandler) {
      acceptHandler();
    }
  };
  const declineHandle = () => {
    if (declineHandler) {
      declineHandler();
    }
  };

  console.log(mode);

  return (
    <Card data-testid='profile-card'>
      <CardHeader
        action={
          <ChipItem data-testid='total-id'>
            {`${daysBalance}${t('profileCard.d')}`}
          </ChipItem>
        }
        avatar={
          <ProfileUserCard
            name={user_surname}
            surname={user_name}
            image={avatar}
            position={reviewer_position}
            isBadge={isBadge}
            showName
            isUserCard
          />
        }></CardHeader>
      <CardContent>
        <AbsenceType
          status={type}
          days={Number(`${dayjs(end_date).diff(dayjs(start_date), 'day')}`)}
          icon={statusIcons[type]}
          t={t}
        />

        {start_date || end_date ? (
          <Grid container justifyContent='space-between' rowGap={4}>
            {start_date && (
              <Stack>
                <Typography variant='body2' color='text.secondary' mb={1}>
                  {t('profileCard.startDate')}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.primary'
                  fontWeight='bold'>
                  {start_date}
                </Typography>
              </Stack>
            )}
            {end_date && (
              <Stack>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  align='right'
                  mb={1}>
                  {t('profileCard.endDate')}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.primary'
                  fontWeight='bold'>
                  {end_date}
                </Typography>
              </Stack>
            )}
          </Grid>
        ) : null}
      </CardContent>
      {isActions && (
        <CardActions>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Button
                onClick={acceptHandle}
                sx={{
                  textTransform: 'capitalize',
                  color: mode === 'light' ? 'common.white' : 'secondary.dark',
                  '&:hover': {
                    color: 'common.white',
                  },
                }}>
                <h4>{t('profileCard.accept')}</h4>
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={declineHandle}
                color='secondary'
                sx={{
                  textTransform: 'capitalize',
                  color: 'common.white',
                }}>
                {t('profileCard.decline')}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};
