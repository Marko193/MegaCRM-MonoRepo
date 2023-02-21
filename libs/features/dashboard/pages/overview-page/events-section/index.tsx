import {BirthdayCakeIcon} from '@mega-dev-crm/shared';
// import {Grid} from '@mui/material';
import {EventCard} from 'libs/features/components/event-card/event-card';
import {FunctionComponent} from 'react';

interface EventSectionProps {
  title: string;
}

export const EventSection: FunctionComponent<EventSectionProps> = ({title}) => {
  return (
    <EventCard
      title={title}
      count={32}
      icon={<BirthdayCakeIcon />}
      smallIcon={<BirthdayCakeIcon width={16} height={18} />}
      list={[]}
      childrenList={[]}
      isBirthdays={true}
    />
  );
};

/* <Grid item>
        <EventCard
          title={'asdasd'}
          count={32}
          icon={<BirthdayCakeIcon />}
          smallIcon={<BirthdayCakeIcon width={16} height={18} />}
          list={[]}
          childrenList={[]}
          isBirthdays={true}
        />
      </Grid>
      <Grid item>
        <EventCard
          title={'asdasd'}
          count={32}
          icon={<BirthdayCakeIcon />}
          smallIcon={<BirthdayCakeIcon width={16} height={18} />}
          list={[]}
          childrenList={[]}
          isBirthdays={true}
        />
      </Grid> */
