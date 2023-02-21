import {FunctionComponent, useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextField, FormControl, Grid, Button, Stack} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {MuiTelInput} from 'mui-tel-input';

import {schema} from './validation';
import {
  SkypeIcon,
  Telegram,
  LinkedIn,
  InstagramIcon,
  FacebookIcon,
  ErrorMessage,
} from '@mega-dev-crm/shared';
// import {useDispatch} from 'react-redux';
import {errorMessageChecker} from '@mega-dev-crm/utilities';
import {CreateEmployeeContext} from 'libs/features/contexts';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import {addCandidateActions} from '../../../../store/employees/employees-actions';

export interface ContactsProps {
  handleNext: () => void;
  handleBack: () => void;
  steps: string[];
  activeStep: number;
}

export const Contacts: FunctionComponent<ContactsProps> = ({
  handleNext,
  handleBack,
  steps,
  activeStep,
}) => {
  const {value, setValue}: any = useContext(CreateEmployeeContext);
  const {
    handleSubmit,
    register,
    control,
    formState: {isValid, errors},
  } = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {t} = useTypedTranslation(nameSpaces.createEmployee);

  // const dispatch = useDispatch();
  console.log(value);

  const onSubmit = async (data: any) => {
    setValue({...value, contacts: {...data}});
    // await dispatch();
    // addCandidateActions.submit({
    //   ...value.generalInfo,
    //   ...data,
    //   expected_payment_level: +value.generalInfo.expected_payment_level,
    //   adding_date: value.generalInfo.adding_date.toISOString(),
    //   assigned_hr_id: 1,
    //   age: 22,
    // })
    await handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{width: '100%', marginTop: '32px'}}>
      <Grid container spacing={1} direction={'column'}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='main_phone'
                control={control}
                render={({field}) => (
                  <MuiTelInput
                    label={t('contacts.mainPhone')}
                    fullWidth
                    variant='outlined'
                    error={!!errors['main_phone']}
                    {...field}
                    defaultCountry='UA'
                  />
                )}
              />
              <ErrorMessage
                message={errorMessageChecker(
                  errors['main_phone']?.message as string
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name='additional_phone'
              render={({field}) => (
                <MuiTelInput
                  label={t('contacts.additionalPhone')}
                  fullWidth
                  variant='outlined'
                  {...field}
                  defaultCountry='UA'
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label={t('contacts.personalEmail') + ' *'}
                variant='outlined'
                {...register('personal_email')}
                error={!!errors['personal_email']}
              />
              <ErrorMessage
                message={errorMessageChecker(
                  errors['personal_email']?.message as string
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label={t('contacts.corporateEmail') + ' *'}
                variant='outlined'
                {...register('corporate_email')}
                error={!!errors['corporate_email']}
              />
              <ErrorMessage
                message={errorMessageChecker(
                  errors['corporate_email']?.message as string
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container mb={2} item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label='Skype'
                {...register('skype')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SkypeIcon />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label='Telegram'
                {...register('telegram')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Telegram />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container mb={2} item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label='LinkedIn'
                {...register('linkedin')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LinkedIn />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label='Instagram'
                {...register('instagram')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item mb={2} xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id='input-with-icon-textfield'
                label='Facebook'
                {...register('facebook')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} spacing={2} mb={3}>
            <TextField
              id='outlined-multiline-flexible'
              label='Note'
              fullWidth
              multiline
              minRows={4}
              maxRows={10}
              {...register('comment')}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Stack direction='row'>
            <Button
              color='secondary'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}>
              {t('buttons.back')}
            </Button>
            <Button disabled={!isValid} color={'primary'} type='submit'>
              {activeStep === steps.length - 1
                ? t('buttons.create')
                : t('buttons.next')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
