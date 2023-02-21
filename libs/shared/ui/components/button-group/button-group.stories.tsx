import type { Meta, Story } from '@storybook/react/types-6-0';
import { ButtonGroupComponent, ButtonGroupProps } from '@mega-dev-crm/shared';

export default {
  title: 'Components/ButtonGroupComponent',
  component: ButtonGroupComponent,
} as Meta;

export const Template: Story<ButtonGroupProps> = (args) => (
  <ButtonGroupComponent {...args} />
);
