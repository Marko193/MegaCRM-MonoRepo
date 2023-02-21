import {FunctionComponent, MouseEvent} from 'react';
import {ToggleButton} from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';

export enum EMPLOYEES_BUTTONS {
  ALL = 'all',
  PROBATION = 'probation',
  NEW = 'new',
}

export interface ButtonGroupProps {
  buttonsList: EMPLOYEES_BUTTONS[];
  value: Partial<EMPLOYEES_BUTTONS>;
  handler: (value: Partial<EMPLOYEES_BUTTONS>) => void;
}

export const ButtonGroupComponent: FunctionComponent<ButtonGroupProps> = ({
  buttonsList,
  value,
  handler,
}) => {
  const {t} = useTypedTranslation(nameSpaces.employees);
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: Partial<EMPLOYEES_BUTTONS>
  ) => {
    if (newAlignment === null) {
      handler(value);
    } else {
      handler(newAlignment);
    }
  };

  return buttonsList ? (
    <ToggleButtonGroup
      data-testid='toggle-button-group'
      value={value}
      exclusive
      onChange={handleChange}>
      {buttonsList.map((button) => (
        <ToggleButton data-testid='toggle-button' key={button} value={button}>
          {t(`general.${button}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  ) : null;
};
