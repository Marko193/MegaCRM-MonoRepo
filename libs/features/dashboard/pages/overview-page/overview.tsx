import {
  // selectAllMembers,
  nameSpaces,
  useAppSelector,
  getAllEmployees,
  useTypedTranslation,
  useFetchAllEmployeesQuery,
  useFetchEmployeeMembersQuery,
  selectEntities,
} from '@mega-dev-crm/features';
import Grid from '@mui/material/Grid';
import {EventSection} from './events-section';
import {RequestApprovalsSection} from './request-approvals';
export interface MeetingsMockDataInterface {
  title: string;
  label: string;
  quantity: string | number;
  id: number | string;
}

export interface MeetingsMockFilterDataInterface {
  label: string;
  id: number | string;
}

export default () => {
  const {isLoading: isEmployeesLoading} = useFetchAllEmployeesQuery(undefined);
  const {isLoading: isMembersLoading, refetch} =
    useFetchEmployeeMembersQuery('husband');

  const members = useAppSelector(selectEntities);
  const employees = useAppSelector(getAllEmployees);

  console.log('>>>>>>>.', {employees});
  console.log('>>>>>>>.', {members});

  const {t} = useTypedTranslation(nameSpaces.overview);
  if (isEmployeesLoading && isMembersLoading) return <h1>LOADING......</h1>;
  return (
    <Grid container spacing={2} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
      <Grid item container md={10} xs={12} spacing={2}>
        <Grid item container direction={'row'} spacing={2}>
          <Grid item md={4} xs={12}>
            <EventSection title='Birthday' />
          </Grid>
          <Grid item md={4} xs={12}>
            <button onClick={refetch}>REFETCH</button>
            <EventSection title='Anniversary' />
          </Grid>
          <Grid item md={4} xs={12}>
            <EventSection title='Kids birthday' />
          </Grid>
        </Grid>

        <Grid item container>
          <RequestApprovalsSection
            title={t('categoriesNames.requestsForApproval')}
          />
          <h1>here is requests</h1>
        </Grid>

        <Grid item container md={12}>
          <h1>here is probations</h1>
        </Grid>
      </Grid>

      <Grid item container md={2} xs={12}>
        <Grid item>here is events</Grid>
      </Grid>
    </Grid>
  );
};
