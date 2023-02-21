import {FunctionComponent, ReactNode} from 'react';
import {Grid, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {defineWordEndingAfterNumber} from '@mega-dev-crm/utilities';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {EventStatuses} from '@mega-dev-crm/shared';

interface AbsenceType {
  status?: Partial<EventStatuses>;
  days?: number;
  icon?: ReactNode;
  //TODO:doesn't have appropriate type
  t?: any;
}

export const AbsenceType: FunctionComponent<AbsenceType> = ({
  status = '',
  days = 0,
  icon,
  t,
}) => {
  return (
    <Grid
      container
      data-testid='absence-type'
      justifyContent='space-between'
      rowSpacing={2}
      mb={1}>
      <Stack direction='row' gap='4px' alignItems='center'>
        {icon}
        <Typography color='text.primary' variant='body2'>
          {t(`eventStatuses.${status}`)}
        </Typography>
      </Stack>
      <Stack data-testid='days-amount'>
        <Typography variant='body2' color='text.error' fontWeight='bold'>
          {`${days} ${defineWordEndingAfterNumber(
            days,
            t('profileCard.day'),
            t('profileCard.ofDay'),
            t('profileCard.ofDays'),
            'day'
          )}`}
        </Typography>
      </Stack>
    </Grid>
  );
};
