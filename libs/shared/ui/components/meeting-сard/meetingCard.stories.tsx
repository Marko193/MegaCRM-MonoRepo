import type { Meta, Story } from '@storybook/react/types-6-0';
import type { MeetingCardProps } from './meetingCard';
import { MeetingCard } from '@mega-dev-crm/shared';

export default {
  title: 'Components/MeetingCard',
  component: MeetingCard,
} as Meta;

export const Template: Story<MeetingCardProps> = (args) => (
  <MeetingCard {...args} />
);
