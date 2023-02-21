import { FunctionComponent } from 'react';

export interface SchedulePageProps {
  title: string;
}

export const SchedulePage: FunctionComponent<SchedulePageProps> = ({
  title,
}) => {
  return <div className="flex p-20 justify-center">{title}</div>;
};

export default SchedulePage;
