import {FunctionComponent} from 'react';
import {Grid, Typography, useTheme} from '@mui/material';
import {CardRangeSlider} from './cardRangeSlider';
import {useTypedTranslation} from '../../hooks';
import {nameSpaces, TranslationKey} from '../../localization/typedNameSpaces';

// TODO: make an interface for ISO string (assign @andrewmarushko)
interface CardRangeProps {
  startDate: string;
  endDate: string;
  startLabel: TranslationKey;
  endLabel: TranslationKey;
  rangeSlider?: boolean;
}

export const CardRange: FunctionComponent<CardRangeProps> = ({
  startLabel,
  endLabel,
  startDate,
  endDate,
  rangeSlider = false,
}) => {
  const {
    palette: {mode},
  } = useTheme();

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();
  const {t} = useTypedTranslation(nameSpaces.common);

  return (
    <Grid width='100%' data-testid='card-range'>
      <Grid container justifyContent='space-between'>
        <Grid item textAlign='left'>
          <Typography
            variant='body2'
            my={1}
            color={mode === 'light' ? 'secondaryGray.darker' : 'text.primary'}>
            {t(startLabel)}
          </Typography>
          <Typography variant='h4'>{formattedStartDate}</Typography>
        </Grid>
        <Grid item textAlign='right'>
          <Typography
            variant='body2'
            color={mode === 'light' ? 'secondaryGray.darker' : 'text.primary'}
            my={1}>
            {t(endLabel)}
          </Typography>
          <Typography variant='h4'>{formattedEndDate}</Typography>
        </Grid>
      </Grid>
      {rangeSlider && (
        <CardRangeSlider startDate={startDate} endDate={endDate} />
      )}
    </Grid>
  );
};
