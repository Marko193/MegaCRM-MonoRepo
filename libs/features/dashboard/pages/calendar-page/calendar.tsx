import {FunctionComponent} from 'react';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import {Paper} from '@mui/material';

const currentDate = '2022-11-06';
const schedulerData = [
  {
    startDate: '2022-11-06T09:45',
    endDate: '2022-11-06T11:00',
    title: 'Meeting',
  },
  {
    startDate: '2022-11-06T12:00',
    endDate: '2022-11-06T13:30',
    title: 'Go to a gym',
  },
];

export interface CalendarPageProps {
  title: string;
}

export const CalendarPage: FunctionComponent<CalendarPageProps> = ({title}) => {
  return (
    <Paper>
      {title}
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default CalendarPage;
