import type { Meta, Story } from '@storybook/react/types-6-0';
import { ProfileHeader, ProfileHeaderProps } from '@mega-dev-crm/shared';

export default {
  title: 'Profile/ProfileHeader',
  component: ProfileHeader,
} as Meta;

export const Template: Story<ProfileHeaderProps> = (args) => (
  <ProfileHeader {...args}>
    <div></div>
  </ProfileHeader>
);
