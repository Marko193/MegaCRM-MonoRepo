import {Grid, Typography} from '@mui/material';

import {
  ItemType,
  ProfileCard,
} from 'libs/features/components/profileCard/profileCard';
import {FunctionComponent} from 'react';

interface RequestApprovalsSectionProps {
  title: string;
  requestsForApproval?: [any];
}

export const RequestApprovalsSection: FunctionComponent<
  RequestApprovalsSectionProps
> = ({title, requestsForApproval}) => {
  return (
    <Grid container>
      <Grid item mb={2} mt={4}>
        <Typography variant='h1'>{title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {requestsForApproval &&
          requestsForApproval.map((item: ItemType) => (
            <Grid item xs={12} md={4}>
              <ProfileCard key={item.id} item={item} isActions={true} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};
