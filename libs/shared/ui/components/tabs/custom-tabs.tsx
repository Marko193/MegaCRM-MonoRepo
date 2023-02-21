import {FunctionComponent, SyntheticEvent} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {IconPositionsEnum} from '@mega-dev-crm/shared';
import {
  nameSpaces,
  TranslationKey,
  useTypedTranslation,
} from '@mega-dev-crm/features';

export interface TabsListItem {
  iconPosition: Partial<IconPositionsEnum>;
  label: TranslationKey;
  icon: JSX.Element;
}

export interface CustomTabsProps {
  tabsList: TabsListItem[];
  handler: (value: number) => void;
  value: number;
}

export const CustomTabs: FunctionComponent<CustomTabsProps> = ({
  tabsList,
  handler,
  value,
}) => {
  const {t} = useTypedTranslation(nameSpaces.common);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    handler(newValue);
  };

  return tabsList.length > 0 ? (
    <Tabs value={value} onChange={handleChange}>
      {tabsList.map(({icon, iconPosition, label}) => {
        return (
          <Tab
            key={label}
            icon={<Box>{icon}</Box>}
            iconPosition={iconPosition}
            label={t(label)}
          />
        );
      })}
    </Tabs>
  ) : null;
};
