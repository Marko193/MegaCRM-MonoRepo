import {FunctionComponent} from 'react';
import {Grid, Typography, Slider, useTheme} from '@mui/material';
import {RangeThumb} from '@mega-dev-crm/shared';
import {getSliderValue} from '@mega-dev-crm/utilities';
import {useTypedTranslation} from '../../hooks';
import {nameSpaces} from '../../localization/typedNameSpaces';

interface CardRangeSliderProps {
  startDate: string;
  endDate: string;
}

export const CardRangeSlider: FunctionComponent<CardRangeSliderProps> = ({
  startDate,
  endDate,
}) => {
  const {t} = useTypedTranslation(nameSpaces.common);
  const {
    palette: {mode},
    spacing,
  } = useTheme();

  return (
    <Grid container pt={spacing(2)}>
      <Slider
        data-testid='slider'
        components={{Thumb: RangeThumb}}
        value={getSliderValue(startDate, endDate)}
        disabled
      />
      <Grid container justifyContent='space-between'>
        <Grid item textAlign='left'>
          <Typography
            variant='caption'
            lineHeight={spacing(2.5)}
            color={mode === 'light' ? 'secondaryGray.darker' : 'text.primary'}>
            {t('cardRange.startRange')}
          </Typography>
        </Grid>
        <Grid item textAlign='right'>
          <Typography
            variant='caption'
            lineHeight={spacing(2.5)}
            color={mode === 'light' ? 'secondaryGray.darker' : 'text.primary'}>
            {t('cardRange.endRange')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
