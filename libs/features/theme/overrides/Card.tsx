export const Card = {
  MuiCard: {
    styleOverrides: {
      root: ({theme, theme: {palette, customShadows}}: any) => ({
        disableSpacing: true,
        color: palette.primary.constrastText,
        boxShadow: customShadows.shadow,
        borderRadius: 8,
        position: 'relative',
        zIndex: 0,
        backgroundColor:
          palette.mode === 'light'
            ? palette.common.white
            : palette.secondary.dark,
        [theme.breakpoints.up(0)]: {
          padding: 0,
        },
      }),
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {variant: 'h4'},
      subheaderTypographyProps: {variant: 'body2'},
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '0px',
        paddingBottom: '16px',
      },
    },
  },
};
