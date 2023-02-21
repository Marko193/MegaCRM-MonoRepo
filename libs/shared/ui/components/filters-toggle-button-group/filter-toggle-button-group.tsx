import {FunctionComponent} from 'react';
import {alpha, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {styled} from '@mui/material/styles';
import {VacationIcon} from '../../icons/vacationIcon';
import {DayOffIcon} from '../../icons/DayOffIcon';
import {SicknessIcon} from '../../icons/sicknessIcon';
import {HomeOfficeIcon} from '../../icons/HomeOfficeIcon';
import {ParentalLeave} from '../../icons/parentalLeave';
import {BusinessTripIcon} from '../../icons/BusinessTripIcon';

export interface FilterToggleButtonGroupProps {
  formats: string[];
  handleFormat: any;
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  '& 	.MuiToggleButtonGroup-grouped': {
    backgroundColor: 'transparent',
    border: 'none',
    height: 'inherit',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.12),
      color: theme.palette.text.primary,
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.secondary.light, 0.2)
          : alpha(theme.palette.common.black, 0.2),
      color: theme.palette.text.primary,
    },
  },
}));

export const FilterToggleButtonGroup: FunctionComponent<
  FilterToggleButtonGroupProps
> = ({formats, handleFormat}) => {
  return (
    <StyledToggleButtonGroup value={formats} onChange={handleFormat}>
      <ToggleButton value='0' aria-label='0'>
        <VacationIcon />
      </ToggleButton>
      <ToggleButton value='1' aria-label='1'>
        <DayOffIcon />
      </ToggleButton>
      <ToggleButton value='2' aria-label='2'>
        <SicknessIcon />
      </ToggleButton>
      <ToggleButton value='3' aria-label='3'>
        <HomeOfficeIcon />
      </ToggleButton>
      <ToggleButton value='4' aria-label='4'>
        <ParentalLeave />
      </ToggleButton>
      <ToggleButton value='5' aria-label='5'>
        <BusinessTripIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};
