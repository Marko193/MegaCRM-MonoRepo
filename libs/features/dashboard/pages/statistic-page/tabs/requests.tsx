import {Grid, Stack} from '@mui/material';
import {mockDataApprovalRequests} from '../../overview-page/overviewMock';
import {Fragment} from 'react';
// import {
//   ItemType,
//   ProfileCard,
// } from '../../../../components/profileCard/profileCard';

export const RequestsTab = () => {
  return (
    <Stack mt={3}>
      <Grid container columnSpacing={13.5} rowSpacing={4}>
        {mockDataApprovalRequests.map((item: any) => (
          <Fragment key={item.id}>
            {/* <ProfileCard
              key={item.id}
              item={item}
              isActions={true}
              isTotal={true}
            /> */}
            <h1>lol</h1>
          </Fragment>
        ))}
      </Grid>
    </Stack>
  );
};
