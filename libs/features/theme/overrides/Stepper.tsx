export const Stepper = {
  MuiStepper: {
    styleOverrides: {
      root: ({theme, theme: {palette}}: any) => ({
        color: 'white',
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({theme, theme: {palette}}: any) => ({
        '& .Mui-active': {
          color: 'white',
        },
      }),
      labelContainer: ({theme, theme: {palette}}: any) => ({
        color: palette.secondaryGray.darker,
        fontWeight: 500,
        fontSize: '14px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({theme, theme: {palette}}: any) => ({
        color: palette.secondaryGray.main,
        '& .Mui-active': {
          color: 'white',
        },
      }),
      text: ({theme, theme: {palette}}: any) => ({
        fontWeight: 600,
      }),
    },
    MuiStepConnector: {
      styleOverrides: {
        root: ({theme, theme: {palette}}: any) => ({
          borderColor: 'white',
        }),
      },
    },
  },
};
