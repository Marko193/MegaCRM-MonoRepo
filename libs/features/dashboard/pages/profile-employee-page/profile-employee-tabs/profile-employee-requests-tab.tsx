import {FunctionComponent, MouseEvent, ReactNode, useState} from 'react';
import {
  Button,
  CardActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  BusinessTripIcon,
  ChipsColorsEnum,
  CustomChips,
  DayOffIcon,
  FilterToggleButtonGroup,
  HomeOfficeIcon,
  ParentalLeave,
  ProfileUserCard,
  SicknessIcon,
  statusIcons,
  VacationIcon,
} from '@mega-dev-crm/shared';
import {useEmployeeByIdSelector} from '@mega-dev-crm/data-access';
import {useParams} from 'react-router';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from '../../../../components/forms/auth/login-form/validation';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
  nameSpaces,
  TranslationKey,
  useTypedTranslation,
} from '@mega-dev-crm/features';
import {SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import {requestsMock} from '../../statistic-page/requestsMock';
import {datesDifference} from '@mega-dev-crm/utilities';

export interface CalendarRequestsInterface {
  icon: ReactNode;
  value: string;
  label: TranslationKey;
  id: number;
}

const calendarRequests: CalendarRequestsInterface[] = [
  {
    icon: <VacationIcon />,
    value: 'vacation',
    label: 'balanceCategories.vacation',
    id: 0,
  },
  {
    icon: <DayOffIcon />,
    value: 'dayoff',
    label: 'balanceCategories.day.off',
    id: 1,
  },
  {
    icon: <SicknessIcon />,
    value: 'sickness',
    label: 'balanceCategories.sickness',
    id: 2,
  },
  {
    icon: <HomeOfficeIcon />,
    value: 'homeoffice',
    label: 'balanceCategories.home.office',
    id: 3,
  },
  {
    icon: <ParentalLeave />,
    value: 'parentalLeave',
    label: 'balanceCategories.parental.leave',
    id: 4,
  },
  {
    icon: <BusinessTripIcon />,
    value: 'businessTrip',
    label: 'balanceCategories.business',
    id: 5,
  },
];

export const ProfileEmployeeRequestsTab: FunctionComponent = () => {
  const {
    spacing,
    palette: {mode},
  } = useTheme();
  const {id} = useParams();
  const currentUser = useEmployeeByIdSelector(Number(id));

  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const [openModal, setOpenModal] = useState(false);
  const [requestType, setRequestType] = useState('');

  const handleFormat = (
    event: MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRequestType(event.target.value as string);
  };

  const {handleSubmit, control} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {t} = useTypedTranslation(nameSpaces.common);
  const columns = [
    {
      name: 'request_type',
      title: t('requestsCategory.request.type'),
      getCellValue: (row: any) => (
        <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
          {statusIcons[row.type]}
          <Typography variant='h3'>{row['type'] || ''}</Typography>
        </Stack>
      ),
    },
    {
      name: 'start_date',
      title: t('requestsCategory.start.date'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {dayjs(row['start_date']).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      name: 'end_date',
      title: t('requestsCategory.end.date'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {dayjs(row['end_date']).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      name: 'requested_days',
      title: t('requestsCategory.requested.days'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {`${datesDifference(row.start_date, row.end_date)} ${t(
            'profileCard.d'
          )}`}
        </Typography>
      ),
    },
    {
      name: 'assigned_hr_id',
      title: t('requestsCategory.assignee'),
      getCellValue: (row: any) => (
        <ProfileUserCard
          name={row.reviewer_name}
          surname={row.reviewer_surname}
          imageSize={25}
          showName={false}
          textColor='common.white'
          avatarFontSize={10}
          justifyContent='center'
        />
      ),
    },
    {
      name: 'status',
      title: t('requestsCategory.status'),
      getCellValue: (row: any) => {
        switch (row['status']) {
          case 'accepted':
            return (
              <CustomChips
                status={ChipsColorsEnum.SUCCESS}
                title={row['status']}
              />
            );
          case 'processing':
            return (
              <CustomChips
                status={ChipsColorsEnum.PRIMARY}
                title={row['status']}
              />
            );
          case 'denied':
            return (
              <CustomChips
                status={ChipsColorsEnum.ERROR}
                title={row['status']}
              />
            );
          default:
            return (
              <CustomChips
                status={ChipsColorsEnum.INFO}
                title={row['status']}
              />
            );
        }
      },
    },
  ];

  const tableColumnExtensions = [
    {columnName: 'request_type', width: 'auto', align: 'left'},
    {columnName: 'start_date', width: 'auto', align: 'left'},
    {columnName: 'end_date', width: 'auto', align: 'left'},
    {columnName: 'requested_days', width: 'auto', align: 'center'},
    {columnName: 'assigned_hr_id', width: 'auto', align: 'center'},
    {columnName: 'status', width: 'auto', align: 'left'},
  ];

  return (
    <Stack
      direction='column'
      my={spacing(3)}
      bgcolor={mode === 'light' ? 'common.white' : 'secondary.dark'}
      p={spacing(3)}
      boxShadow='0px 4px 5px rgba(0, 0, 0, 0.1)'
      borderRadius={spacing(1)}
      spacing={2}
      width='100%'>
      <Stack width='max-content'>
        <Button
          sx={{
            textTransform: 'capitalize',
          }}
          onClick={() => setOpenModal(true)}>
          {`+ ${t('requestsCategory.add.request')}`}
        </Button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Stack
            position='absolute'
            top={0}
            right={0}
            p={spacing(2)}
            sx={{
              bgcolor: mode === 'light' ? 'common.white' : 'secondary.dark',
              height: '100%',
              minWidth: '366px',
            }}>
            <Typography>{t('requestsCategory.new.request')}</Typography>
            <Stack justifyContent='center' pb={spacing(2)}>
              <ProfileUserCard
                name={currentUser?.name}
                surname={currentUser?.surname}
                imageSize={80}
                image={currentUser?.avatar}
                showName
                isUserCard
                rowDirection='column'
                justifyContent='center'
              />
            </Stack>
            <form onSubmit={handleSubmit(() => console.log('sent'))}>
              <Grid container spacing={1} direction={'column'}>
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>{`${t(
                      'requestsCategory.type.request'
                    )} *`}</InputLabel>
                    <Select
                      value={requestType}
                      label='Type of request'
                      onChange={handleChange}>
                      {calendarRequests.map(({label, icon, value, id}) => (
                        <MenuItem key={id} value={value}>
                          <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'>
                            {icon}
                            <Typography>{t(label)}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Controller
                      name='start_date'
                      defaultValue={dayjs()}
                      control={control}
                      render={({field: {onChange, ...restField}}) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={t('requestsCategory.start.date')}
                            inputFormat='DD/MM/YYYY'
                            onChange={(event) => {
                              onChange(event);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            {...restField}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <Controller
                      name='end_date'
                      defaultValue={dayjs()}
                      control={control}
                      render={({field: {onChange, ...restField}}) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={t('requestsCategory.end.date')}
                            inputFormat='DD/MM/YYYY'
                            onChange={(event) => {
                              onChange(event);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            {...restField}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </FormControl>
                  <Typography textAlign='end' color='text.error' variant='h5'>
                    2 days used(22 days left)
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label={t('requestsCategory.comment')}
                      variant='outlined'
                      placeholder={t('requestsCategory.type.smth')}
                      multiline
                      rows={4}
                    />
                  </FormControl>
                </Stack>
                <Stack>
                  <CardActions
                    sx={{
                      p: spacing(2, 0),
                    }}>
                    <Button
                      type='submit'
                      sx={{
                        textTransform: 'capitalize',
                      }}>
                      {t('buttons.send')}
                    </Button>
                    <Button
                      type='reset'
                      sx={{
                        textTransform: 'capitalize',
                        bgcolor:
                          mode === 'light'
                            ? 'text.secondary'
                            : 'secondaryGray.darker',
                      }}
                      onClick={() => setOpenModal(false)}>
                      {t('buttons.cancel')}
                    </Button>
                  </CardActions>
                </Stack>
              </Grid>
            </form>
          </Stack>
        </Modal>
      </Stack>
      <Stack>
        <FilterToggleButtonGroup
          formats={formats}
          handleFormat={handleFormat}
        />
      </Stack>
      <Stack>
        <TableGrid rows={requestsMock} columns={columns}>
          <SortingState />
          <IntegratedSorting />
          <Table columnExtensions={tableColumnExtensions as any} />
          <TableHeaderRow showSortingControls />
        </TableGrid>
      </Stack>
    </Stack>
  );
};
