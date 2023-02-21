import type { Meta, Story } from '@storybook/react/types-6-0';
import { CustomTabs, CustomTabsProps } from '@mega-dev-crm/shared';

export default {
  title: 'Components/CustomTabs',
  component: CustomTabs,
} as Meta;

export const Template: Story<CustomTabsProps> = (args) => (
  <CustomTabs {...args} />
);
