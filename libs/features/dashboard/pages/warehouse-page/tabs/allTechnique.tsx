import {MenuItem, Select, Stack, Typography, useTheme} from '@mui/material';
import {FunctionComponent} from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  IntegratedSorting,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import {warehouseMock} from '../warehouseMock';

export interface WarehouseInterface {
  id: string;
  created_at: string;
  updated_at: string;
  item_status: string;
  comment: string;
  item_condition_type: string;
  item_name: string;
  item_type: string;
  item_number: string;
  model_number: string;
  item_price: string;
  item_currency_value: string;
  item_vendor_type: string;
}

export const AllTechnique: FunctionComponent = () => {
  const {t} = useTypedTranslation([nameSpaces.common]);

  const {
    shape,
    spacing,
    palette: {mode},
  } = useTheme();

  const columns = [
    {
      name: 'inventory_num',
      title: t('warehouseCategories.inventory.number'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['item_number'] || ''}</Typography>
      ),
    },
    {
      name: 'equipment_name',
      title: t('warehouseCategories.name'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['item_name'] || ''}</Typography>
      ),
    },
    {
      name: 'equipment_type',
      title: t('warehouseCategories.type'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['item_type'] || ''}</Typography>
      ),
    },
    {
      name: 'model',
      title: t('warehouseCategories.model'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['model_number'] || ''}</Typography>
      ),
    },
    {
      name: 'condition',
      title: t('warehouseCategories.condition'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['item_condition_type'] || ''}</Typography>
      ),
    },
    {
      name: 'issue_date',
      title: t('warehouseCategories.date_of_issue'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['model_number'] || ''}</Typography>
      ),
    },
    {
      name: 'receiving_date',
      title: t('warehouseCategories.date_of_receiving'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['model_number'] || ''}</Typography>
      ),
    },
  ];

  const secondLineColumns = [
    {
      name: 'price',
      title: t('warehouseCategories.price'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>
          {`${row['item_price'] || ''} ${row['item_currency_value'] || ''}`}
        </Typography>
      ),
    },
    {
      name: 'comment',
      title: t('warehouseCategories.comment'),
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row['comment'] || ''}</Typography>
      ),
    },
  ];

  const RowDetail = ({row}: any) => {
    const warehouseItemArray = [];
    warehouseItemArray.push(row);
    return (
      <Grid rows={warehouseItemArray} columns={secondLineColumns as any}>
        <Table columnExtensions={secondaryColumnExtensions as any} />
        <TableHeaderRow />
      </Grid>
    );
  };

  const tableColumnExtensions = [
    {columnName: 'inventory_num', width: 'auto', align: 'left'},
    {columnName: 'equipment_name', width: 'auto', align: 'left'},
    {columnName: 'equipment_type', width: 'auto', align: 'left'},
    {columnName: 'model', width: 'auto', align: 'left'},
    {columnName: 'condition', width: 'auto', align: 'left'},
    {columnName: 'issue_date', width: 'auto', align: 'left'},
    {columnName: 'receiving_date', width: 'auto', align: 'left'},
    {columnName: 'show_more', width: 'auto', align: 'left'},
  ];

  const secondaryColumnExtensions = [
    {columnName: 'price', width: '15%', align: 'left'},
    {columnName: 'column', width: '15%', align: 'left'},
  ];

  const equipmentTypes = warehouseMock.map((item) => item.item_type);
  const allTechnique = ['all technique', ...equipmentTypes];

  return (
    <Stack
      mt={3}
      sx={{
        borderRadius: `${shape.borderRadius}px`,
        backgroundColor: mode === 'light' ? 'common.white' : 'secondary.dark',
      }}>
      <Stack p={spacing(2)}>
        <Select
          defaultValue={allTechnique[0]}
          sx={{
            width: 'fit-content',
          }}>
          {allTechnique.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </Stack>
      <Grid rows={warehouseMock} columns={columns as any}>
        <SortingState />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions as any} />
        <TableHeaderRow showSortingControls />
        <RowDetailState />
        <TableRowDetail contentComponent={RowDetail} />
      </Grid>
    </Stack>
  );
};
