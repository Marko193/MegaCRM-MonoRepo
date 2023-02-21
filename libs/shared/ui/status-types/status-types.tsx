import {
  VacationIcon,
  SicknessIcon,
  ParentalLeave,
  DayOffIcon,
  HomeOfficeIcon,
  BusinessTripIcon,
} from '@mega-dev-crm/shared';
import {EventStatuses} from '../interfaces/common-interfaces';

interface statusIconsType {
  [index: string]: JSX.Element;
}

export const statusIcons: statusIconsType = {
  [EventStatuses.VACATION]: <VacationIcon />,
  [EventStatuses.SICKNESS]: <SicknessIcon />,
  [EventStatuses.PARENTAL_LEAVE]: <ParentalLeave />,
  [EventStatuses.DAY_OFF]: <DayOffIcon />,
  [EventStatuses.HOME_OFFICE]: <HomeOfficeIcon />,
  [EventStatuses.BUSINESS_TRIP]: <BusinessTripIcon />,
};
