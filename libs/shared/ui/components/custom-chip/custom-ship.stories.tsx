import type { Meta, Story } from '@storybook/react/types-6-0';
import type { CustomChipsProps } from './custom-chip';
import { CustomChips } from '@mega-dev-crm/shared';

export default {
  title: 'Components/CustomChips',
  component: CustomChips,
} as Meta;

export const Template: Story<CustomChipsProps> = (args) => (
  <CustomChips {...args} />
);
