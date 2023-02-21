export const TextField = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
      colorPrimary: ({theme: {palette}}: any) => ({
        backgroundColor: palette.common.white,
      }),
      input: ({theme: {palette}}: any) => ({color: palette.common.black}),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        backgroundColor: 'inherit',
      },
      input: ({theme: {palette}}: any) => ({
        color: palette.primary.contrastText,
        '&:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 100px ${palette.background.paper} inset`,
        },
      }),
    },
  },
};
