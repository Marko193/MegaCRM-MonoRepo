import {FunctionComponent, useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import {schema} from './validation';
import {LanguageBlock} from '../../../language-block/language-block';
import {ErrorMessage} from '@mega-dev-crm/shared';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {CreateEmployeeContext} from 'libs/features/contexts';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import { WorkInfo as WorkInfoValues } from '@mega-dev-crm/data-access';
// import {useEmployeeById} from 'libs/data-access/apps/dashboard/store/employees/employees-selectors';

export interface WorkInfoProps {
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  activeStep: number;
  isEdit: boolean;
}

export const WorkInfo: FunctionComponent<WorkInfoProps> = ({
  handleNext,
  handleBack,
  activeStep,
  isEdit,
}) => {
  const {value, setValue}: any = useContext(CreateEmployeeContext);
  const employee = {};
  const {t} = useTypedTranslation(nameSpaces.createEmployee);
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: {isValid, errors},
  } = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: isEdit
      ? {...employee}
      : {
          // technologies: [],
          language: [{name: '', level: ''}],
          assigneHR: '',
          assigneSales: '',
          assignePM: '',
          user_status: '',
          user_level: '',
          format_of_work: '',
          user_position: '',
          role_id: '',
          is_probation_period: false,
          employee_start_date: dayjs(),
          employee_end_date: dayjs().add(3, 'month'),
          ...value.workInfo,
        },
  });

  console.log(value.generalInfo);

  const onSubmit = (data: any) => {
    if (!watch('is_probation_period')) {
      setValue({
        ...value,
        workInfo: {
          ...data,
          employee_start_date: dayjs().toISOString(),
          employee_end_date: null,
        },
      });
    } else {
      setValue({
        ...value,
        workInfo: {
          ...data,
          employee_start_date: dayjs(data.employee_start_date).toISOString(),
          employee_end_date: dayjs(data.employee_end_date).toISOString(),
        },
      });
    }

    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{width: '100%', marginTop: '32px'}}>
      <Grid container spacing={2} direction={'column'}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('workInfo.position')} *
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label={t('workInfo.position') + '*'}
                value={watch('user_position')}
                {...register('user_position')}
                error={!!errors['user_position']}>
                <MenuItem value='frontEnd'>Front-end developer</MenuItem>
                <MenuItem value='backEnd'>Back-end developer</MenuItem>
                <MenuItem value='HR'>HR</MenuItem>
              </Select>

              <ErrorMessage
                message={errorMessageChecker(
                  errors['user_position']?.message as string
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('workInfo.level')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label={t('workInfo.position')}
                {...register('user_level')}
                value={watch('user_level')}>
                <MenuItem value='trainee'>Trainee</MenuItem>
                <MenuItem value='junior'>Junior</MenuItem>
                <MenuItem value='middle'>Middle</MenuItem>
                <MenuItem value='senior'>Senior</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.role')} *
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.role') + ' *'}
              value={watch('role_id')}
              {...register('role_id')}>
              <MenuItem value='1'>Admin</MenuItem>
              <MenuItem value='2'>Super admin</MenuItem>
              <MenuItem value='3'>User</MenuItem>
              <MenuItem value='4'>HR</MenuItem>
              <MenuItem value='5'>Sales</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.status')} *
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.status') + ' *'}
              value={watch('user_status')}
              {...register('user_status')}>
              <MenuItem value='fullTime'>Full-time</MenuItem>
              <MenuItem value='partTime'>Part-time</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} ml={1}>
          <FormControlLabel
            control={
              <Switch
                checked={watch('is_probation_period')}
                {...register('is_probation_period')}
              />
            }
            label={t('workInfo.trial')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              data-testid='email-input'
              id='outlined-basic'
              label={t('workInfo.rateM') + ' *'}
              variant='outlined'
              {...register('salary')}
              error={!!errors['salary']}
            />
            <ErrorMessage
              message={errorMessageChecker(errors['salary']?.message as string)}
            />
          </FormControl>
        </Grid>
        {watch('is_probation_period') && (
          <Grid container item spacing={2} xs={12}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='employee_start_date'
                  defaultValue={dayjs()}
                  control={control}
                  render={({field: {onChange, ...restField}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={'Start date *'}
                        inputFormat='DD/MM/YYYY'
                        onChange={(event) => {
                          onChange(event);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={!!errors['employee_start_date']}
                            {...params}
                          />
                        )}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />
                <ErrorMessage
                  message={errorMessageChecker(
                    errors['employee_start_date']?.message as string
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='employee_end_date'
                  defaultValue={dayjs()}
                  control={control}
                  render={({field: {onChange, ...restField}}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={'End date *'}
                        inputFormat='DD/MM/YYYY'
                        onChange={(event) => {
                          onChange(event);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={!!errors['employee_end_date']}
                            {...params}
                          />
                        )}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />
                <ErrorMessage
                  message={errorMessageChecker(
                    errors['employee_end_date']?.message as string
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
        <LanguageBlock />
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.technologies')}
            </InputLabel>
            <Select
              multiple
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.technologies')}
              value={watch('technologies')}
              {...register('technologies')}>
              <MenuItem value='react'>React</MenuItem>
              <MenuItem value='vue'>Vue.js</MenuItem>
              <MenuItem value='angular'>Angular</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.assigneHr')} *
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.assigneHr') + ' *'}
              value={watch('assigneHR')}
              {...register('assigneHR')}>
              <MenuItem value='1'>Inna Femelova</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.assigneSales')}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.assigneSales')}
              value={watch('assigneSales')}
              {...register('assigneSales')}>
              <MenuItem value='2'>Vadym Bestaev</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('workInfo.assignePm')}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('workInfo.assignePm')}
              value={watch('assignePM')}
              {...register('assignePM')}>
              <MenuItem value='1'>Anastasiya</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row'>
            <Button
              color='secondary'
              variant='contained'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}>
              {t('buttons.back')}
            </Button>
            <Button disabled={!isValid} color={'primary'} type='submit'>
              {t('buttons.next')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
