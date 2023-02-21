import {Stack, Typography, useTheme} from '@mui/material';
import {FunctionComponent, MouseEvent, useState} from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import {Link} from 'react-router-dom';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';
import {FilterToggleButtonGroup} from '@mega-dev-crm/shared';
import {requestsStatisticMock} from '../requestsMock';

export const RequestsStatistic: FunctionComponent = () => {
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
        <Link to={`statistic/${row.id}`}>
          <Typography variant='h3' sx={{textDecoration: 'underline'}}>
            {`${row['name'] || ''} ${row['surname'] || ''}`}
          </Typography>
        </Link>
      ),
    },
    {
      name: '2020',
      title: '2020',
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.requests[2020].length}</Typography>
      ),
    },
    {
      name: '2021',
      title: '2021',
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.requests[2021].length}</Typography>
      ),
    },
    {
      name: '2',
      title: '2022',
      getCellValue: (row: any) => (
        <Typography variant='h3'>{row.requests[2022].length}</Typography>
      ),
    },
  ];

  const tableColumnExtensions = [
    {columnName: 'name', width: 'auto', align: 'left'},
    {columnName: '2020', width: 'auto', align: 'left'},
    {columnName: '2021', width: 'auto', align: 'left'},
    {columnName: '2022', width: 'auto', align: 'left'},
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
      <Grid rows={requestsStatisticMock} columns={columns as any}>
        <SortingState />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions as any} />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Stack>
  );
};
