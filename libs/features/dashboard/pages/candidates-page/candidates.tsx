import {
  ButtonGroupComponent,
  ChipsColorsEnum,
  CustomChips,
  CustomMenu,
  EMPLOYEES_BUTTONS,
  PageHeader,
} from '@mega-dev-crm/shared';
import {
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import {FunctionComponent, useState} from 'react';
import dayjs from 'dayjs';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import {Link} from 'react-router-dom';
import {
  nameSpaces,
  TranslationKey,
  useTypedTranslation,
} from '@mega-dev-crm/features';

const menuOptions: TranslationKey[] = [
  'menuItems.delete',
  'menuItems.edit',
  'menuItems.profile',
  'menuItems.resume',
];

const handleDelete = (id: number, setAnchorEl: Function) => {
  setAnchorEl(null);
};

const handleEdit = (id: number, setAnchorEl: Function) => {
  setAnchorEl(null);
};

const rows = [
  {
    id: 1,
    created_at: '2022-10-05T13:11:30.269Z',
    updated_at: '2022-11-04T12:50:57.004Z',
    added_date: dayjs().toISOString(),
    main_phone: '232332233',
    additional_phone: '111111',
    corporate_email: 'marik8998@gmail.com',
    personal_email: 'personal@nure.ua',
    avatar: null,
    name: 'name',
    surname: 'surname',
    inn: '233232',
    country: null,
    is_account_active: true,
    salary: '300.00',
    city: null,
    age: 22,
    sex: 'male',
    password: '$2b$12$l85W/sIG544L.IK902EMHO7943BDGNa7WeMmrNVEN1nhWHFC1yjq6',
    date_of_birth: '2022-10-05',
    company_name: 'Megadev',
    is_probation_period: false,
    employee_start_date: '2022-10-05T13:11:30.269Z',
    format_of_work: 'remote',
    role_id: 1,
    last_login: '2022-11-04T12:50:56.955Z',
    employee_end_date: '2022-10-05T13:11:30.269Z',
    merchant_size: null,
    user_level: 'middle',
    user_status: 'parttime',
    probation_start_date: null,
    probation_end_date: null,
    skype: null,
    telegram: null,
    linkedin: null,
    instagram: null,
    facebook: null,
    emergency_contact: null,
    emergency_phone: null,
    assigned_hr_id: 2,
    assigned_pm_id: null,
    assigned_sales_id: null,
    vacation_days_balance: null,
    sickness_days_balance: 5,
    day_off_days_balance: 2,
    home_office_days_balance: 4,
    parental_days_balance: 14,
    business_days_balance: 5,
    role_info: {
      id: 1,
      created_at: '2022-10-05T13:11:30.269Z',
      updated_at: '2022-10-05T13:11:30.269Z',
      role: 'admin',
      description: 'admin-role',
      active: true,
      content: 'asdsada',
    },
    family_members: [],
    user_languages: [
      {
        id: 3,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        language_name_id: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          name: 'Russian',
        },
        language_level_info: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          level_name: 'A1',
        },
      },
    ],
    user_skills: [
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'javascript',
        },
        user_id: 19,
      },
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'react.js',
        },
        user_id: 19,
      },
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'css',
        },
        user_id: 19,
      },
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'angular',
        },
        user_id: 19,
      },
    ],
    user_positions: [
      {
        id: 17,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        position_info: {
          id: 1,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          position_name: 'software_engineer',
        },
      },
    ],
    user_calendar_requests: [],
    family: [],
  },
  {
    id: 2,
    created_at: '2022-10-05T13:11:30.269Z',
    updated_at: '2022-11-03T22:43:12.538Z',
    added_date: dayjs().toISOString(),
    user_languages: [
      {
        id: 3,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        language_name_id: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          name: 'Russian',
        },
        language_level_info: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          level_name: 'A1',
        },
      },
    ],
    main_phone: '444444',
    additional_phone: '2323223',
    corporate_email: 'test@gmail.com',
    personal_email: 'alal@nure.ua',
    avatar: null,
    name: 'TEST',
    surname: 'SURNAME',
    inn: '444444',
    country: null,
    is_account_active: true,
    salary: '500.00',
    city: null,
    age: 25,
    sex: 'male',
    password: '$2b$12$l85W/sIG544L.IK902EMHO7943BDGNa7WeMmrNVEN1nhWHFC1yjq6',
    date_of_birth: '2000-01-01',
    company_name: 'mega',
    is_probation_period: false,
    employee_start_date: '2022-10-05T13:11:30.269Z',
    format_of_work: 'office',
    role_id: 4,
    last_login: '2022-11-03T22:43:12.492Z',
    employee_end_date: '2022-11-03T20:13:22.948Z',
    merchant_size: null,
    user_level: 'junior',
    user_status: 'fulltime',
    probation_start_date: null,
    probation_end_date: null,
    skype: null,
    telegram: null,
    linkedin: null,
    instagram: null,
    facebook: null,
    emergency_contact: null,
    emergency_phone: null,
    assigned_hr_id: 1,
    assigned_pm_id: null,
    assigned_sales_id: null,
    vacation_days_balance: null,
    sickness_days_balance: 4,
    day_off_days_balance: 5,
    home_office_days_balance: 8,
    parental_days_balance: 11,
    business_days_balance: 2,
    role_info: {
      id: 4,
      created_at: '2022-10-05T13:11:30.269Z',
      updated_at: '2022-10-05T13:11:30.269Z',
      role: 'hr',
      description: 'hr-role',
      active: true,
      content: 'test',
    },
    family_members: [],
    user_skills: [
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'javascript',
        },
        user_id: 19,
      },
    ],
    user_positions: [
      {
        id: 17,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        position_info: {
          id: 1,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          position_name: 'software_engineer',
        },
      },
    ],
    user_calendar_requests: [],
    family: [],
  },
  {
    id: 17,
    user_languages: [
      {
        id: 3,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        language_name_id: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          name: 'Russian',
        },
        language_level_info: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          level_name: 'A1',
        },
      },
    ],

    created_at: '2022-10-05T13:11:30.269Z',
    updated_at: '2022-11-03T22:45:43.508Z',
    added_date: dayjs().toISOString(),
    main_phone: '12323',
    additional_phone: '1111112',
    corporate_email: 'dhaponov@gmail.com',
    personal_email: 'personal1@nure.ua',
    avatar: null,
    name: 'name',
    surname: 'surname',
    inn: '2332321',
    country: null,
    is_account_active: true,
    salary: '300.00',
    city: null,
    age: 22,
    sex: 'male',
    password: '$2b$12$l85W/sIG544L.IK902EMHO7943BDGNa7WeMmrNVEN1nhWHFC1yjq6',
    date_of_birth: '2022-10-05',
    company_name: 'Megadev',
    is_probation_period: false,
    employee_start_date: '2022-10-05T13:11:30.269Z',
    format_of_work: 'remote',
    role_id: 1,
    last_login: '2022-11-03T22:45:43.475Z',
    employee_end_date: '2022-10-05T13:11:30.269Z',
    merchant_size: null,
    user_level: 'middle',
    user_status: 'parttime',
    probation_start_date: null,
    probation_end_date: null,
    skype: null,
    telegram: null,
    linkedin: null,
    instagram: null,
    facebook: null,
    emergency_contact: null,
    emergency_phone: null,
    assigned_hr_id: 2,
    assigned_pm_id: null,
    assigned_sales_id: null,
    vacation_days_balance: null,
    sickness_days_balance: 5,
    day_off_days_balance: 2,
    home_office_days_balance: 4,
    parental_days_balance: 14,
    business_days_balance: 5,
    role_info: {
      id: 1,
      created_at: '2022-10-05T13:11:30.269Z',
      updated_at: '2022-10-05T13:11:30.269Z',
      role: 'admin',
      description: 'admin-role',
      active: true,
      content: 'asdsada',
    },
    family_members: [],
    user_skills: [
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'javascript',
        },
        user_id: 19,
      },
    ],
    user_positions: [
      {
        id: 17,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        position_info: {
          id: 1,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          position_name: 'software_engineer',
        },
      },
    ],
    user_calendar_requests: [],
    family: [],
  },
  {
    id: 19,
    created_at: '2022-11-04T08:21:22.737Z',
    updated_at: '2022-11-04T08:21:22.737Z',
    added_date: dayjs().toISOString(),
    main_phone: '+3332',
    additional_phone: '+14441',
    corporate_email: 'on@nure.ua',
    personal_email: 'tropaa@nure.ua',
    avatar: 'avatar-path.jpeg',
    name: 'MООООООООООО',
    surname: 'Pavlenko',
    inn: '33129',
    country: 'Ukraine',
    is_account_active: true,
    salary: '1000.00',
    city: 'Kharkiv',
    age: 22,
    sex: 'male',
    password: '$2b$12$de532aaezgQ260tpILpAqOuw0WwkL6uZfVJyrxLBVj4fvd11HvUfK',
    date_of_birth: '2000-01-16',
    company_name: 'MeGaDevLLC',
    is_probation_period: true,
    employee_start_date: '2022-10-20T19:45:22.124Z',
    format_of_work: 'remote',
    role_id: 4,
    last_login: '2022-10-25T20:23:31.331Z',
    employee_end_date: '2022-10-20T19:45:22.124Z',
    merchant_size: 's',
    user_level: 'junior',
    user_status: 'fulltime',
    probation_start_date: '2021-04-20T19:45:22.124Z',
    probation_end_date: '2021-06-20T19:45:22.124Z',
    skype: null,
    telegram: 'mihanchik94',
    linkedin: null,
    instagram: null,
    facebook: null,
    emergency_contact: null,
    emergency_phone: null,
    assigned_hr_id: 51,
    assigned_pm_id: null,
    assigned_sales_id: null,
    vacation_days_balance: 10,
    sickness_days_balance: 10,
    day_off_days_balance: 10,
    home_office_days_balance: 10,
    parental_days_balance: 10,
    business_days_balance: 10,
    role_info: {
      id: 4,
      created_at: '2022-10-05T13:11:30.269Z',
      updated_at: '2022-10-05T13:11:30.269Z',
      role: 'hr',
      description: 'hr-role',
      active: true,
      content: 'test',
    },
    family_members: [
      {
        id: 3,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        family_member_type: 'husband',
        name: 'Harry',
        sex: 'male',
        date_of_birth: '2004-01-29',
      },
    ],
    user_languages: [
      {
        id: 3,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        language_name_id: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          name: 'Russian',
        },
        language_level_info: {
          id: 1,
          created_at: '2022-10-23T23:09:21.385Z',
          updated_at: '2022-10-23T23:09:21.385Z',
          level_name: 'A1',
        },
      },
    ],
    user_skills: [
      {
        id: 4,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        skill_info: {
          id: 4,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          skill_name: 'javascript',
        },
        user_id: 19,
      },
    ],
    user_positions: [
      {
        id: 17,
        created_at: '2022-11-04T08:21:22.737Z',
        updated_at: '2022-11-04T08:21:22.737Z',
        user_id: 19,
        position_info: {
          id: 1,
          created_at: '2022-10-23T21:03:20.073Z',
          updated_at: '2022-10-23T21:03:20.073Z',
          position_name: 'software_engineer',
        },
      },
    ],
    user_calendar_requests: [],
    family: [],
  },
];

export const CandidatesPage: FunctionComponent = () => {
  const {t} = useTypedTranslation([
    nameSpaces.common,
    nameSpaces.candidates,
    nameSpaces.employees,
  ]);

  const {shape} = useTheme();

  const columns = [
    {
      name: 'name',
      title: t('user.fullname'),
      getCellValue: (row: any) => (
        <Link to={`candidates/${row.id}`}>
          <Typography variant='h3' sx={{textDecoration: 'underline'}}>
            {`${row['name'] || ''} ${row['surname'] || ''}`}
          </Typography>
        </Link>
      ),
    },
    {
      name: 'user_positions',
      title: t('user.position'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {`${
            row['user_positions'][0]['position_info']['position_name'] || ''
          }`}
        </Typography>
      ),
    },
    {
      name: 'salary',
      title: '$',
      getCellValue: (row: any) => (
        <Typography variant='h3'>{`$${row['salary'] || '$0'}`}</Typography>
      ),
    },
    {
      name: 'user_skills',
      title: t('user.technologies'),
      getCellValue: (row: any) => (
        <Stack flexWrap='wrap' flexDirection='row' gap={1}>
          {row['user_skills'].map(({skill_info}: any, index: number) => {
            return (
              <CustomChips
                key={index}
                status={ChipsColorsEnum.INFO}
                title={skill_info['skill_name']}
              />
            );
          })}
        </Stack>
      ),
    },
    {
      name: 'user_languages',
      title: t('user.languages'),
      getCellValue: (row: any) => (
        <Stack>
          {row['user_languages'].map(
            ({language_name_id, language_level_info}: any, index: number) => {
              return (
                <Typography variant='h3' key={index}>
                  {language_name_id['name']} (
                  {language_level_info['level_name']})
                </Typography>
              );
            }
          )}
        </Stack>
      ),
    },
    {
      name: 'assigned_hr_id',
      title: t('user.assigne'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.assigned_hr_id}</Typography>
      ),
    },
    {
      name: 'added_date',
      title: t('user.dateAdded'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {dayjs(row.added_date).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      name: 'menu',
      title: ' ',
      getCellValue: (row: any) => (
        <CustomMenu
          id={row.id}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          menuOptions={menuOptions}
        />
      ),
    },
  ];

  const tableColumnExtensions = [
    {columnName: 'name', width: 'auto', align: 'left'},
    {columnName: 'user_positions', width: 'auto', align: 'left'},
    {columnName: 'user_skills', width: '20%', align: 'left'},
    {columnName: 'user_languages', width: 'auto', align: 'left'},
    {columnName: 'assigned_hr_id', width: '10%', align: 'center'},
    {columnName: 'added_date', width: 'auto', align: 'left'},
    {columnName: 'menu', width: '5%', align: 'center'},
    {columnName: 'salary', width: '10%', align: 'left'},
  ];

  const buttonsList: EMPLOYEES_BUTTONS[] = [
    EMPLOYEES_BUTTONS.ALL,
    EMPLOYEES_BUTTONS.NEW,
  ];
  const [alignment, setAlignment] = useState(EMPLOYEES_BUTTONS.ALL);

  return (
    <Stack>
      <PageHeader
        quantity={`10 ${t('general.people')}`}
        button={t('candidates.addCandidate')}
        title={t('candidates.candidatess')}
        route={'candidates'}
      />
      <Stack
        mb={3}
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Stack flexDirection='row' gap={2} alignItems='center'>
          <ButtonGroupComponent
            value={alignment}
            handler={setAlignment}
            buttonsList={buttonsList}
          />
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant='h2' color='secondaryGray.darker'>
                {t('candidates.onlyMine')}
              </Typography>
            }
          />
        </Stack>
        <Stack>
          <Select defaultValue='1' placeholder='All'>
            <MenuItem value='1'>Front-end Developer</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <Stack
        sx={{
          backgroundColor: 'common.white',
          borderRadius: `${shape.borderRadius}px`,
        }}>
        <Grid rows={rows} columns={columns as any}>
          <SortingState />
          <IntegratedSorting />
          <Table columnExtensions={tableColumnExtensions as any} />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Stack>
    </Stack>
  );
};

export default CandidatesPage;
