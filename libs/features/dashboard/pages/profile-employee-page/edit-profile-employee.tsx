import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import {GeneralInfo} from 'libs/features/components/forms/employees/general-info/general-info';
import {WorkInfo} from 'libs/features/components/forms/employees/work-info/work-info';
import {Contacts} from 'libs/features/components/forms/employees/contacts/contacts';
import {CreateEmployeeProvider} from 'libs/features/contexts';
import {useTypedTranslation} from 'libs/features/hooks';
import {nameSpaces} from 'libs/features/localization/typedNameSpaces';
// import {getUserByIdAction} from '../../../store/employees/employees-actions';
// import {useDispatch} from 'react-redux';
// import {useParams} from 'react-router';

export const EditProfileEmployeePage = ({isEdit}: any) => {
  const {t} = useTypedTranslation(nameSpaces.createEmployee);
  // const dispatch = useDispatch();
  // const id = useParams()['id'];

  const steps = [
    t('steps.generalInfo'),
    t('steps.workInfo'),
    t('steps.contacts'),
  ];

  React.useEffect(() => {
    // if (id) {
    // dispatch(getUserByIdAction.submit(id));
    // }
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <CreateEmployeeProvider>
      <Box sx={{width: '90%', m: '0 auto', my: 5}}>
        <Grid container xs={7}>
          <Stepper sx={{width: '100%'}} activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: {completed?: boolean} = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{mt: 4, mb: 1}}>
              Congratulations! User added!
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Box sx={{flex: '1 1 auto'}} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <GeneralInfo
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                steps={steps}
                isEdit={isEdit}
              />
            )}
            {activeStep === 1 && (
              <WorkInfo
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                steps={steps}
                isEdit={isEdit}
              />
            )}
            {activeStep === 2 && (
              <Contacts
                handleNext={handleNext}
                handleBack={handleBack}
                activeStep={activeStep}
                steps={steps}
                isEdit={isEdit}
              />
            )}
          </React.Fragment>
        )}
      </Box>
    </CreateEmployeeProvider>
  );
};

export default EditProfileEmployeePage;
