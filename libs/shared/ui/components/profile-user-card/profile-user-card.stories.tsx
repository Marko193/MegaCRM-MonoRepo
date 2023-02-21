import type { Meta, Story } from '@storybook/react/types-6-0';
import { ProfileUserCard, ProfileUserCardProps } from '@mega-dev-crm/shared';

export default {
  title: 'Components/ProfileUserCard',
  component: ProfileUserCard,
} as Meta;

export const Template: Story<ProfileUserCardProps> = (args) => (
  <ProfileUserCard {...args} />
);
