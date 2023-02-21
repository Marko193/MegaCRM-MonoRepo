import {FunctionComponent, useEffect} from 'react';
import {Grid, useTheme} from '@mui/material';
// import {
//   ButtonGroupComponent,
//   ContactsLine,
//   EmailDogIcon,
//   EMPLOYEES_BUTTONS,
//   HandsetIcon,
//   ProfileUserCard,
//   TelegramIcon,
//   CustomMenu,
// } from '@mega-dev-crm/shared';
// import {
//   deleteEmployeeActions,
//   loadUsersListActions,
//   NEW_EMPLOYEE,
//   useEmployeesListSelector,
//   useEmployeesOnProbationSelector,
// } from '@mega-dev-crm/data-access';
// import {useDispatch} from 'react-redux';
// import {
//   useTypedTranslation,
//   TranslationKey,
//   nameSpaces,
// } from '@mega-dev-crm/features';
// import {useNavigate} from 'react-router';

// TODO: make a enum instead of menuOptions array
// const menuOptions: TranslationKey[] = [
//   'menuItems.delete',
//   'menuItems.edit',
//   'menuItems.active/inactive',
// ];

export const EmployeesPage: FunctionComponent = () => {
  // const dispatch = useDispatch();
  const {spacing} = useTheme();
  // const {t} = useTypedTranslation(nameSpaces.employees);
  // const navigate = useNavigate();

  useEffect(() => {
    // dispatch(loadUsersListActions.submit());
  }, []);

  // const employeesList = useEmployeesListSelector();
  // const employeesOnProbationList = useEmployeesOnProbationSelector();

  // const buttonsList: EMPLOYEES_BUTTONS[] = [
  //   EMPLOYEES_BUTTONS.ALL,
  //   EMPLOYEES_BUTTONS.PROBATION,
  // ];
  // const [alignment, setAlignment] = useState(EMPLOYEES_BUTTONS.ALL);

  // const handleDelete = (id: number, setAnchorEl: Function) => {
  //   // dispatch(deleteEmployeeActions.submit({id: id}));
  //   setAnchorEl(null);
  // };

  // const handleEdit = (id: number, setAnchorEl: Function) => {
  //   navigate(`/employee-profile/${id}/edit`);
  //   setAnchorEl(null);
  // };

  // const handleActivate = (id: number, setAnchorEl: Function) => {
  //   setAnchorEl(null);
  // };

  // const arrayToRender =
  //   alignment === 'all' ? employeesList : employeesOnProbationList;

  return (
    <Grid container p={spacing(5.5, 6.375, 3, 6.375)}>
      {/* <Stack
        width='100%'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        pb={spacing(8)}>
        <Stack spacing={3} direction='row'>
          <Typography>{t('general.employees')}</Typography>
          <Typography>
            {employeesList.length} {t('general.people')} {t('general.s')}
          </Typography>
        </Stack>
        <Stack>
          <Button
            sx={{
              textTransform: 'capitalize',
            }}
            onClick={() => {
              navigate(`/${NEW_EMPLOYEE}`);
            }}>
            + {t('general.add.employee')}
          </Button>
        </Stack>
      </Stack>
      <Stack pb={spacing(3)}>
        <ButtonGroupComponent
          value={alignment}
          handler={setAlignment}
          buttonsList={buttonsList}
        />
      </Stack>
      <Grid
        container
        columnSpacing={spacing(3)}
        rowSpacing={spacing(2.25)}
        spacing={2}>
        {arrayToRender.map(
          ({
            name,
            surname,
            avatar,
            id,
            corporate_email,
            main_phone,
            telegram,
            user_position,
          }) => {
            return (
              <Grid item xs={4} key={id}>
                <Grid
                  container
                  direction='column'
                  p={spacing(2)}
                  boxShadow='0px 4px 5px rgba(0, 0, 0, 0.1)'
                  bgcolor={mode === 'dark' ? 'secondary.dark' : 'common.white'}
                  borderRadius={spacing(1)}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Stack>
                      <ProfileUserCard
                        name={name}
                        surname={surname}
                        position={user_position?.position_info?.position_name}
                        image={avatar}
                        showName={true}
                        isBadge={true}
                        isLink={true}
                        id={id}
                        imageSize={60}
                      />
                    </Stack>
                    <Stack>
                      <CustomMenu
                        id={id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleActivate={handleActivate}
                        menuOptions={menuOptions}
                      />
                    </Stack>
                  </Stack>
                  <Stack mt={spacing(2)} minHeight={spacing(7.5)}>
                    <ContactsLine
                      isMail={true}
                      value={corporate_email}
                      icon={<EmailDogIcon />}
                    />
                    <ContactsLine
                      isPhone={true}
                      value={main_phone}
                      icon={<HandsetIcon />}
                    />
                    {telegram && (
                      <ContactsLine
                        isTelegram={true}
                        value={telegram}
                        icon={<TelegramIcon />}
                      />
                    )}
                  </Stack>
                  <Stack
                    justifyContent='center'
                    direction={'row'}
                    pt={spacing(2)}>
                    <Button
                      sx={{
                        width: 'fit-content',
                        textTransform: 'capitalize',
                        color:
                          mode === 'light' ? 'common.white' : 'secondary.dark',
                        '&:hover': {
                          color: 'common.white',
                        },
                      }}
                      onClick={() => {
                        navigate(`/employee-profile/${id}`);
                      }}>
                      {t('general.view.profile')}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            );
          }
        )}
      </Grid> */}
    </Grid>
  );
};

export default EmployeesPage;
