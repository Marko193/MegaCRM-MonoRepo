import {FunctionComponent, useState} from 'react';
import {Stack} from '@mui/material';
import {
  CustomTabs,
  IconPositionsEnum,
  PageHeader,
  TabsListItem,
  WarehouseIcon,
} from '@mega-dev-crm/shared';
import {useTypedTranslation} from '../../../hooks';
import {nameSpaces} from '../../../localization/typedNameSpaces';
import {AllTechnique} from './tabs/allTechnique';

export interface WarehousePageProps {
  title: string;
}

export const WarehousePage: FunctionComponent<WarehousePageProps> = ({
  title,
}) => {
  const [value, setValue] = useState(0);
  const {t} = useTypedTranslation(nameSpaces.common);

  const tabsList: TabsListItem[] = [
    {
      icon: <WarehouseIcon />,
      iconPosition: IconPositionsEnum.TOP,
      label: 'warehouseCategories.all.technique',
    },
  ];
  return (
    <Stack>
      <PageHeader
        button={`+ ${t('warehouseCategories.add.technique')}`}
        route={'warehouse'}
        title={t('warehouseCategories.warehouse')}
      />
      <CustomTabs tabsList={tabsList} value={value} handler={setValue} />
      {value === 0 && <AllTechnique />}
    </Stack>
  );
};
