/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  ArchiveIcon,
  CustomTabs,
  IconPositionsEnum,
  PageHeader,
  RequestsIcon,
  StatisticIcon,
  TabsListItem,
  WarehouseIcon,
} from '@mega-dev-crm/shared';
import {Stack} from '@mui/material';
import {FunctionComponent, useState} from 'react';
import {RequestsTab} from './tabs/requests';
import {TechnologiesRequests} from './tabs/technologiesRequests';
import {RequestsArchive} from './tabs/requestsArchive';
import {RequestsStatistic} from './tabs/requestsStatistic';
import {useTypedTranslation} from '../../../hooks';
import {nameSpaces} from '../../../localization/typedNameSpaces';

export interface StatisticPageProps {
  title: string;
}

export const StatisticPage: FunctionComponent<StatisticPageProps> = ({
  title,
}) => {
  const [value, setValue] = useState(0);
  const {t} = useTypedTranslation(nameSpaces.common);

  const tabsList: TabsListItem[] = [
    {
      icon: <RequestsIcon />,
      iconPosition: IconPositionsEnum.TOP,
      label: 'categoryNames.requests',
    },
    {
      icon: <WarehouseIcon width={18} height={18} />,
      iconPosition: IconPositionsEnum.TOP,
      label: 'categoryNames.technology.requests',
    },
    {
      icon: <ArchiveIcon width={18} height={18} />,
      iconPosition: IconPositionsEnum.TOP,
      label: 'categoryNames.archive.requests',
    },
    {
      icon: <StatisticIcon />,
      iconPosition: IconPositionsEnum.TOP,
      label: 'categoryNames.statistic',
    },
  ];
  return (
    <Stack>
      <PageHeader title={t('requestsCategory.vacation.requests')} />
      <CustomTabs tabsList={tabsList} value={value} handler={setValue} />
      {value === 0 && <RequestsTab />}
      {value === 1 && <TechnologiesRequests />}
      {value === 2 && <RequestsArchive />}
      {value === 3 && <RequestsStatistic />}
    </Stack>
  );
};

export default StatisticPage;
