import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {useFieldArray} from 'react-hook-form';

export const LanguageBlock = ({control, register}: any) => {
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'language',
  });
  return (
    <>
      <Grid container item xs={12} spacing={2}>
        {fields.map((item, index) => (
          <Grid container item xs={12} key={item.id} spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Language</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Language'
                  defaultValue=''
                  {...register(`language.${index}.name`)}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Level</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Level'
                  defaultValue=''
                  {...register(`language.${index}.level`)}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button type='button' onClick={() => remove(index)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid mt={2} ml={2}>
        <Button
          type='button'
          onClick={() => append({name: 'foo1', level: 'bar1'})}>
          append
        </Button>
      </Grid>
    </>
  );
};
