import {EventStatuses} from '@mega-dev-crm/shared';
import {
  MeetingsMockDataInterface,
  MeetingsMockFilterDataInterface,
} from '@mega-dev-crm/features';

export const mockMeetingsData: MeetingsMockDataInterface[] = [
  {
    title: 'Welcome meeting',
    label: 'meetingCards.welcome.meeting',
    quantity: '3',
    id: 1,
  },
  {
    title: 'Adaptation meeting',
    label: 'meetingCards.adaptation.meeting',
    quantity: '1',
    id: 2,
  },
  {
    title: 'Probation meeting',
    label: 'meetingCards.probation.meeting',
    quantity: '1',
    id: 3,
  },
  {
    title: 'Performance review',
    label: 'meetingCards.performance.review',
    quantity: '6',
    id: 4,
  },
  {
    title: '1 on 1',
    label: 'meetingCards.one.on.one',
    quantity: '4',
    id: 5,
  },
  {
    title: 'Exit interview',
    label: 'meetingCards.exit.interview',
    quantity: '5',
    id: 6,
  },
];

export const mockMeetingsFilterData: MeetingsMockFilterDataInterface[] = [
  {
    label: 'meetingCards.tomorrow',
    id: 1,
  },
  {
    label: 'meetingCards.current.week',
    id: 2,
  },
  {
    label: 'meetingCards.next.week',
    id: 3,
  },
  {
    label: 'meetingCards.current.month',
    id: 4,
  },
];

export const mockDataApprovalRequests = [
  {
    name: 'Fred',
    surname: 'Gudinny',
    position: 'Director',
    startDate: '23.03.2022',
    endDate: '25.03.2022',
    status: EventStatuses.VACATION,
    days: 2,
    total: '10',
    id: 1,
  },
  {
    name: 'Fred',
    surname: 'Gudinny',
    position: 'Director',
    startDate: '23.03.2022',
    endDate: '25.03.2022',
    status: EventStatuses.SICKNESS,
    days: 2,
    total: '10',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_example_170227_1250_yq2lr.png',
    id: 2,
  },
  {
    name: 'Fred',
    surname: 'Gudinny',
    position: 'Director',
    startDate: '23.03.2022',
    endDate: '25.03.2022',
    status: EventStatuses.VACATION,
    days: 2,
    total: '10',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_example_170227_1250_yq2lr.png',
    id: 3,
  },
  {
    name: 'Fred',
    surname: 'Gudinny',
    position: 'Director',
    startDate: '23.03.2022',
    endDate: '25.03.2022',
    status: EventStatuses.VACATION,
    days: 2,
    total: '10',
    avatar:
      'https://pickaface.net/gallery/avatar/unr_example_170227_1250_yq2lr.png',
    id: 4,
  },
];
