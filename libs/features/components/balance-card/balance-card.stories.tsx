import type {Meta, Story} from '@storybook/react/types-6-0';
import {BalanceCard, BalanceCardProps} from '@mega-dev-crm/features';
import {ProfileUserCard} from '@mega-dev-crm/shared';
import {Grid} from '@mui/material';

export interface BalanceCardChildrenInterface {
  name: string;
  surname: string;
  avatar: string;
  id: number;
}

const mockDataForBalanceCard: BalanceCardChildrenInterface[] = [
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 1,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 2,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 3,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 4,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 5,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 6,
  },
  {
    name: 'Filip',
    surname: 'Kelenli',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    id: 7,
  },
];

export default {
  title: 'Components/BalanceCardComponent',
  component: BalanceCard,
} as Meta;

export const Template: Story<BalanceCardProps> = (args) => (
  <BalanceCard {...args}>
    {mockDataForBalanceCard.map(({name, surname, avatar, id}) => {
      return (
        <Grid item xs={4} key={id}>
          <ProfileUserCard
            showName
            name={name}
            surname={surname}
            image={avatar}
            position='Manager'
            isUserCard
          />
        </Grid>
      );
    })}
  </BalanceCard>
);
