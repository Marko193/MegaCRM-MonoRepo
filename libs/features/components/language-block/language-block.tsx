import {
  // Button,
  // CircularProgress,
  Grid,
  // TextField,
  // Autocomplete,
} from '@mui/material';
// import {useTypedTranslation} from 'libs/features/hooks';
// import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import {useFieldArray} from 'react-hook-form';
// import AddIcon from '@mui/icons-material/Add';
// import {
//   loadLanguagesActions,
//   loadLanguagesValuesActions,
// } from 'libs/data-access/apps/dashboard/store/select-values/select-actions';
// import {useDispatch} from 'react-redux';
// import {useState} from 'react';
// import {
//   useLanguageLoading,
//   useLanguageList,
//   useLanguageValuesList,
//   useLanguageValuesLoading,
// } from '../../store/select-values/select-selectors';

export const LanguageBlock = () => {
  // const [openName, setOpenNames] = useState(false);
  // const [openValues, setOpenValues] = useState(false);
  // const {t} = useTypedTranslation(nameSpaces.createEmployee);
  // const dispatch = useDispatch();
  // const {fields, append, remove} = useFieldArray({
  //   control,
  //   name: 'language',
  // });

  // const data = useLanguageList();

  // const isLoading = useLanguageLoading();

  // const valuesData = useLanguageValuesList();
  // const valuesIsLoading = useLanguageValuesLoading();

  return (
    <>
      <Grid container item xs={12} spacing={2}>
        {/* {fields.map((item, index) => (
          <Grid container item xs={12} key={item.id} spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                id='asynchronous-demo'
                open={openName}
                onOpen={() => {
                  dispatch(loadLanguagesActions.submit());
                  setOpenNames(true);
                }}
                onClose={() => {
                  setOpenNames(false);
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={data as any}
                loading={isLoading as any}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workInfo.language')}
                    {...register(`language.${index}.name`)}
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
            <Grid item xs={6}>
              <Autocomplete
                id='asynchronous-demo'
                open={openValues}
                onOpen={() => {
                  dispatch(loadLanguagesValuesActions.submit());
                  setOpenValues(true);
                }}
                onClose={() => {
                  setOpenValues(false);
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.level_name
                }
                getOptionLabel={(option) => option.level_name}
                options={valuesData as any}
                loading={valuesIsLoading as any}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workInfo.level')}
                    {...register(`language.${index}.value`)}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {valuesIsLoading ? (
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
            <Grid item xs={2}>
              <Button type='button' onClick={() => remove(index)}>
                {t('buttons.delete')}
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid mt={2} ml={3}>
        <Button
          startIcon={<AddIcon />}
          type='button'
          onClick={() => append({name: '', level: ''})}>
          {t('buttons.add')}
        </Button> */}
      </Grid>
    </>
  );
};
