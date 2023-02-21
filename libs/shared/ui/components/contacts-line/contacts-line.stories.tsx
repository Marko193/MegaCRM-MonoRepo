import type {Meta, Story} from '@storybook/react/types-6-0';
import type {ContactsLineProps} from './contacts-line';
import {ContactsLine} from '@mega-dev-crm/shared';

export default {
  title: 'Components/ContactsLine',
  component: ContactsLine,
} as Meta;

export const Template: Story<ContactsLineProps> = (args) => (
  <ContactsLine {...args} />
);
