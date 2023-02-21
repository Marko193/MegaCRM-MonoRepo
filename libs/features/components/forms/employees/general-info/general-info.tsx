import {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
// import dayjs from 'dayjs';
import {yupResolver} from '@hookform/resolvers/yup';
// import {
//   TextField,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Button,
//   Avatar,
//   Stack,
// } from '@mui/material';
// import {Country, City} from 'country-state-city';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {schema} from './validation';
// import { ChildrenBlock } from '../../../children-block/children-block';
// import {ErrorMessage} from '@mega-dev-crm/shared';
// import {errorMessageChecker} from '@mega-dev-crm/utilities';
// import {CreateEmployeeContext} from 'libs/features/contexts';
// import {useTypedTranslation} from 'libs/features/hooks';
// import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import { GeneralInfo as GeneralInfoValues } from '@mega-dev-crm/data-access';
// import {useEmployeeById} from 'libs/data-access/apps/dashboard/store/employees/employees-selectors';

export interface GeneralInfoProps {
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  activeStep: number;
  isEdit: boolean;
}

export const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({
  handleNext,
  // handleBack,
  // activeStep,
  // isEdit,
}) => {
  // const {value, setValue}: any = useContext(CreateEmployeeContext);
  // const {t} = useTypedTranslation(nameSpaces.createEmployee);
  // const employee = useEmployeeById();
  const {
    handleSubmit,
    // register,
    // watch,
    // control,
    // formState: {isValid, errors},
  } = useForm<any>({
    mode: 'onChange',
    // defaultValues: isEdit
    //   ? {name: employee.name, surname: employee.surname}
    //   : {
    //       city: '',
    //       country: '',
    //       // merchant_size: '',
    //       sex: '',
    //       // children: [{ firstName: '', birthDate: dayjs(), gender: '' }],
    //       ...value,
    //     },
    resolver: yupResolver(schema),
  });

  // const countries = Country.getAllCountries();
  // const cities = City.getCitiesOfCountry(watch('country'));

  const onSubmit = (data: any) => {
    // setValue({generalInfo: {...data}});
    console.log(data);
    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{width: '100%', marginTop: '32px'}}>
      {/* <Grid container xs={12} spacing={2}>
        <Grid container item xs={7} spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                data-testid='email-input'
                id='outlined-basic'
                label={t('generalInfo.name') + ' *'}
                variant='outlined'
                {...register('name')}
                error={!!errors['name']}
              />
              <ErrorMessage
                message={errorMessageChecker(errors['name']?.message as string)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                data-testid='email-input'
                id='outlined-basic'
                label={t('generalInfo.surname') + ' *'}
                variant='outlined'
                {...register('surname')}
                error={!!errors['surname']}
              />
              <ErrorMessage
                message={errorMessageChecker(
                  errors['surname']?.message as string
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='date_of_birth'
                defaultValue={dayjs()}
                control={control}
                render={({field: {onChange, ...restField}}) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={t('generalInfo.birthDate') + ' *'}
                      inputFormat='DD/MM/YYYY'
                      onChange={(event) => {
                        onChange(event);
                      }}
                      renderInput={(params) => (
                        <TextField
                          error={!!errors['date_of_birth']}
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
                  errors['date_of_birth']?.message as string
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} mb={2}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('generalInfo.gender')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label={t('generalInfo.gender')}
                value={watch('sex')}
                {...register(`sex`)}>
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                data-testid='email-input'
                id='outlined-basic'
                label={t('generalInfo.inn') + ' *'}
                variant='outlined'
                {...register('inn')}
                error={!!errors['inn']}
              />
              <ErrorMessage
                message={errorMessageChecker(errors['inn']?.message as string)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={2}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('generalInfo.country')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label={t('generalInfo.country')}
                defaultValue='UA'
                value={watch('country')}
                {...register('country')}>
                {countries.map(({isoCode, name}) => (
                  <MenuItem key={isoCode} value={isoCode}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                {t('generalInfo.city')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label={t('generalInfo.city')}
                value={watch('city')}
                {...register('city')}>
                {cities?.map(({name}, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={5}>
          <Grid item xs={12}>
            <Stack gap={2}>
              <Stack>
                <Avatar
                  sx={{width: '150px', height: '150px', margin: '0 auto'}}
                  alt='Remy Sharp'
                />
              </Stack>
              <Stack flexDirection='row' justifyContent='center' gap={1}>
                <Button variant='contained' component='label'>
                  {t('buttons.upload')}
                  <input hidden accept='image/*' multiple type='file' />
                </Button>
                <Button>{t('buttons.delete')}</Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <ChildrenBlock control={control} register={register} watch={watch} />
      <Grid container item xs={7} spacing={2} mt={1}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              {t('generalInfo.merchSize')}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={t('generalInfo.merchSize')}
              {...register('merchant_size')}
              value={watch('merchant_size')}>
              <MenuItem value='XS'>XS</MenuItem>
              <MenuItem value='S'>S</MenuItem>
              <MenuItem value='SM'>SM</MenuItem>
              <MenuItem value='M'>M</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
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
            <Button
              variant='contained'
              disabled={!isValid}
              color={'primary'}
              type='submit'>
              {t('buttons.next')}
            </Button>
          </Stack>
        </Grid>
      </Grid> */}
    </form>
  );
};
