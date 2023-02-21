import type { Meta, Story } from '@storybook/react/types-6-0';
import { PopupCard, PopupCardProps } from '@mega-dev-crm/shared';

export default {
  title: 'Components/PopupCard',
  component: PopupCard,
} as Meta;

export const Template: Story<PopupCardProps> = (args) => (
  <PopupCard {...args} />
);
