import {Stack, SvgIcon, Typography, useTheme} from '@mui/material';
import {FunctionComponent, MouseEvent, useState} from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import {Link} from 'react-router-dom';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import {
  ChipsColorsEnum,
  CustomChips,
  FilterToggleButtonGroup,
  statusIcons,
} from '@mega-dev-crm/shared';
import {requestsMock} from '../requestsMock';
import dayjs from 'dayjs';
import {datesDifference} from '@mega-dev-crm/utilities';

export const RequestsArchive: FunctionComponent = () => {
  const {t} = useTypedTranslation([
    nameSpaces.common,
    nameSpaces.candidates,
    nameSpaces.employees,
  ]);

  const {
    shape,
    spacing,
    palette: {mode},
  } = useTheme();

  const columns = [
    {
      name: 'name',
      title: t('user.fullname'),
      getCellValue: (row: any) => (
        <Link to={`employee/${row.id}`}>
          <Typography variant='h3' sx={{textDecoration: 'underline'}}>
            {`${row['user_name'] || ''} ${row['user_surname'] || ''}`}
          </Typography>
        </Link>
      ),
    },
    {
      name: 'request_type',
      title: t('requestsCategory.request.type'),
      getCellValue: (row: any) => <SvgIcon>{statusIcons[row.type]}</SvgIcon>,
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
    {columnName: 'name', width: 'auto', align: 'left'},
    {columnName: 'request_type', width: 'auto', align: 'left'},
    {columnName: 'start_date', width: 'auto', align: 'left'},
    {columnName: 'end_date', width: 'auto', align: 'left'},
    {columnName: 'requested_days', width: 'auto', align: 'left'},
    {columnName: 'assigned_hr_id', width: 'auto', align: 'left'},
    {columnName: 'status', width: 'auto', align: 'left'},
  ];

  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const handleFormat = (
    event: MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  return (
    <Stack
      mt={3}
      sx={{
        borderRadius: `${shape.borderRadius}px`,
        backgroundColor: mode === 'light' ? 'common.white' : 'secondary.dark',
      }}>
      <Stack p={spacing(3, 0, 0, 2)}>
        <FilterToggleButtonGroup
          formats={formats}
          handleFormat={handleFormat}
        />
      </Stack>
      <Grid rows={requestsMock} columns={columns as any}>
        <SortingState />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions as any} />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Stack>
  );
};
