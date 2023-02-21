import {Stack, Typography, useTheme} from '@mui/material';
import {FunctionComponent} from 'react';
import dayjs from 'dayjs';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import {Link} from 'react-router-dom';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import {warehouseRequestMock} from '../requestsMock';

export const TechnologiesRequests: FunctionComponent = () => {
  const {t} = useTypedTranslation([
    nameSpaces.common,
    nameSpaces.candidates,
    nameSpaces.employees,
  ]);

  const {
    shape,
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
      name: 'inventory_number',
      title: t('warehouseCategories.inventory.number'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.item_id.item_number || ''}</Typography>
      ),
    },
    {
      name: 'equipment_type',
      title: t('warehouseCategories.type'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.item_id.item_type || ''}</Typography>
      ),
    },
    {
      name: 'equipment_condition',
      title: t('warehouseCategories.condition'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {row.item_id.item_condition_type || ''}
        </Typography>
      ),
    },
    {
      name: 'request_date',
      title: t('warehouseCategories.date_of_request'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {dayjs(row.created_at).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      name: 'status',
      title: t('warehouseCategories.status'),
      getCellValue: (row: any) => (
        <Stack gap={1}>
          <Link to=''>
            <Typography
              sx={{textDecoration: 'underline'}}
              variant='h3'
              color='text.default'>
              {t('profileCard.approve')}
            </Typography>
          </Link>
          <Link to=''>
            <Typography sx={{textDecoration: 'underline'}} variant='h3'>
              {t('profileCard.reject')}
            </Typography>
          </Link>
        </Stack>
      ),
    },
  ];

  const tableColumnExtensions = [
    {columnName: 'name', width: 'auto', align: 'left'},
    {columnName: 'inventory_number', width: 'auto', align: 'left'},
    {columnName: 'equipment_type', width: 'auto', align: 'left'},
    {columnName: 'equipment_condition', width: 'auto', align: 'left'},
    {columnName: 'request_date', width: 'auto', align: 'left'},
    {columnName: 'status', width: 'auto', align: 'left'},
  ];

  return (
    <Stack
      mt={3}
      sx={{
        borderRadius: `${shape.borderRadius}px`,
        backgroundColor: mode === 'light' ? 'common.white' : 'secondary.dark',
      }}>
      <Grid rows={warehouseRequestMock} columns={columns as any}>
        <SortingState />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions as any} />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Stack>
  );
};

export default TechnologiesRequests;
