import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';
import { ChipsColorsEnum, ChipsTypesEnum } from '@mega-dev-crm/shared';

export interface CustomChipsProps {
  status?: Partial<ChipsColorsEnum>;
  title: string;
  type?: Partial<ChipsTypesEnum>;
}

export const CustomChips: FunctionComponent<CustomChipsProps> = ({
  status = ChipsColorsEnum.DEFAULT,
  title = 'title',
  type = ChipsTypesEnum.INFO,
}) => {
  const { t } = useTranslation();

  return (
    <Chip
      color={status}
      data-testid="custom-chip"
      sx={
        type === ChipsTypesEnum.INFO
          ? {
              minWidth: 56,
              height: 19,
            }
          : {
              minWidth: 84,
              height: 25,
            }
      }
      label={t(title)}
    />
  );
};
