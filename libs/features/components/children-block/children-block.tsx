import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Controller, useFieldArray} from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from 'libs/features/localization/typedNameSpaces';

export const ChildrenBlock = ({control, register, watch}: any) => {
  const {t} = useTypedTranslation(nameSpaces.createEmployee);
  const {palette} = useTheme();
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'children',
  });

  return (
    <>
      <Grid container item xs={12} mt={2} mb={3}>
        {fields.map((item, index) => (
          <Grid
            container
            item
            xs={4}
            gap={2}
            p={2}
            key={item.id}
            sx={{
              background: palette.mode === 'light' ? 'white' : '#4B4B4B',
              borderRadius: '8px',
            }}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                label={t('generalInfo.name')}
                {...register(`children.${index}.firstName`)}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={`children.${index}.birthDate`}
                defaultValue={dayjs()}
                control={control}
                render={({field: {onChange, ...restField}}) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={t('generalInfo.birthDate')}
                      inputFormat='DD/MM/YYYY'
                      onChange={(event) => {
                        onChange(event);
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                      {...restField}
                    />
                  </LocalizationProvider>
                )}
              />
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
                  value={watch(`children.${index}.gender`)}
                  {...register(`children.${index}.gender`)}>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='button' onClick={() => remove(index)}>
                {t('buttons.delete')}
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid container mt={1}>
        <Button
          type='button'
          startIcon={<AddIcon />}
          onClick={() =>
            append({firstName: '', birthDate: dayjs(), gender: ''})
          }>
          {t('buttons.add')}
        </Button>
      </Grid>
    </>
  );
};
