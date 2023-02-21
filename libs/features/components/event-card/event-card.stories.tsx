import type { Meta, Story } from '@storybook/react/types-6-0';
import { EventCard, EventCardProps } from '@mega-dev-crm/shared';

export default {
  title: 'Components/EventCard',
  component: EventCard,
} as Meta;

export const Template: Story<EventCardProps> = (args) => (
  <EventCard {...args} />
);
