export const Tab = {
  MuiTab: {
    styleOverrides: {
      root: ({theme: {palette, customShadows, typography}}: any) => {
        return {
          textTransform: 'none',
          color: palette.secondaryGray.darker,
          boxShadow: customShadows.shadow,
          zIndex: 0,
          ':active': {
            color: palette.secondaryGray.darker,
          },
          ':first-letter': {
            textTransform: 'uppercase',
          },
          '&.Mui-selected': {
            color: palette.secondaryGray.darker,
            fontWeight: typography.fontWeightMedium,
          },
        };
      },
    },
  },
};
