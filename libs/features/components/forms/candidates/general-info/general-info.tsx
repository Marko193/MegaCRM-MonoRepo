import {FunctionComponent, useContext} from 'react';
import {useForm} from 'react-hook-form';
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
//   Autocomplete,
//   CircularProgress,
// } from '@mui/material';
// import {Country, City} from 'country-state-city';

import {schema} from './validation';
// import {ErrorMessage} from '@mega-dev-crm/shared';
// import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {CreateEmployeeContext} from 'libs/features/contexts';
// import {useTypedTranslation} from 'libs/features/hooks';
// import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import {LanguageBlock} from 'libs/features/components/language-block/language-block';
// import {loadTechnologiesActions} from '@mega-dev-crm/data-access';
// import {
//   useTechnologiesList,
//   useTechnologiesLoading,
// } from 'libs/data-access/apps/dashboard/store/select-values/select-selectors';
// import {useDispatch} from 'react-redux';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';

export interface GeneralInfoProps {
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  activeStep: number;
}

export const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({
  handleNext,
  handleBack,
  activeStep,
}) => {
  // const [openTechnologies, setOpenTechnologies] = useState(false);
  // const [openHR, setOpenHR] = useState(false);
  const {value, setValue}: any = useContext(CreateEmployeeContext);
  // const {t} = useTypedTranslation(nameSpaces.createEmployee);
  const {
    handleSubmit,
    // register,
    // watch,
    // control,
    // formState: {isValid, errors},
  } = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      city: '',
      country: '',
      expected_payment_level: '',
      sex: '',
      technologies: [],
      assigned_hr_id: '',
      language: [{name: '', value: ''}],
      ...value?.generalInfo,
    },
    resolver: yupResolver(schema),
  });

  // const data = useTechnologiesList();

  // const isLoading = useTechnologiesLoading();

  // const countries = Country.getAllCountries();
  // const cities = City.getCitiesOfCountry(watch('country'));

  const onSubmit = (data: any) => {
    setValue({...value, generalInfo: {...data}});
    handleNext();
  };

  // const dispatch = useDispatch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{width: '100%', marginTop: '32px'}}>
      {/* <Grid container xs={12} spacing={2}>
        <Grid container item xs={12} spacing={3}>
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={6} spacing={1}>
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
                    message={errorMessageChecker(
                      errors['name']?.message as string
                    )}
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
            </Grid>
            <Grid
              container
              item
              xs={5}
              justifyContent='center'
              alignItems='start'>
              <Grid container item xs={5}>
                <Grid item xs={12}>
                  <Stack gap={2}>
                    <Stack>
                      <Avatar
                        sx={{
                          width: '150px',
                          height: '150px',
                          margin: '0 auto',
                        }}
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
          </Grid>

          <Grid item xs={12}>
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
          <LanguageBlock register={register} control={control} />
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                data-testid='email-input'
                id='outlined-basic'
                label={t('workInfo.expectedPayLevel') + ' *'}
                variant='outlined'
                {...register('expected_payment_level')}
                error={!!errors['expected_payment_level']}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} pt={1}>
            <Autocomplete
              multiple
              open={openTechnologies}
              onOpen={() => {
                dispatch(loadTechnologiesActions.submit());
                setOpenTechnologies(true);
              }}
              onClose={() => {
                setOpenTechnologies(false);
              }}
              isOptionEqualToValue={(option: any, value: any) =>
                option.skill_name === value.skill_name
              }
              getOptionLabel={(option) => option.skill_name}
              options={data as any}
              loading={isLoading as any}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('workInfo.technologies')}
                  value={watch('technologies')}
                  {...register(`technologies`)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? (
                          <CircularProgress color='inherit' size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='adding_date'
                defaultValue={dayjs()}
                control={control}
                render={({field: {onChange, ...restField}}) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={t('generalInfo.addedDate') + ' *'}
                      inputFormat='DD/MM/YYYY'
                      onChange={(event) => {
                        onChange(event);
                      }}
                      renderInput={(params) => (
                        <TextField error={!!errors['added_date']} {...params} />
                      )}
                      {...restField}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              open={openHR}
              onOpen={() => {
                setOpenHR(true);
              }}
              onClose={() => {
                setOpenHR(false);
              }}
              isOptionEqualToValue={(option: any, value: any) =>
                option.role === value.role
              }
              getOptionLabel={(option) => option.role}
              options={[] as any}
              loading={false as any}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('workInfo.assigneHr')}
                  {...register(`assigned_hr_id`)}
                  value={watch('assigned_hr_id')}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
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
