export const Slider = {
  MuiSlider: {
    styleOverrides: {
      root: ({theme: {palette, spacing}}: any) => {
        return {
          color: palette.common.default,
          height: 2,
          padding: spacing(0),
          '&.Mui-disabled': {
            color: palette.common.default,
          },
          '& .MuiSlider-rail': {
            color: `${palette.secondaryGray.darker}38`,
            height: 5,
          },
          '& .MuiSlider-thumb': {
            backgroundColor: 'transparent',
            '&:before': {
              display: 'none',
            },
          },
          '& .MuiSlider-track': {
            height: 0,
          },
        };
      },
    },
  },
};
