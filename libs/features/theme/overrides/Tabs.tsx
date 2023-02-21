export const Tabs = {
  MuiTabs: {
    styleOverrides: {
      root: ({
        theme: {
          palette,
          spacing,
          palette: {mode},
        },
      }: any) => {
        return {
          '& .MuiTabs-indicator': {
            backgroundColor: palette.common.default,
          },
          '& .MuiButtonBase-root': {
            padding: 0,
            margin: spacing(0, 1),
            justifyContent: 'flex-start',
            color:
              mode === 'light'
                ? palette.secondaryGray.darker
                : palette.common.white,
            '& .Mui-selected': {
              color:
                mode === 'light'
                  ? palette.secondaryGray.darker
                  : palette.common.white,
            },
          },
          '& .css-a30vml-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color:
              mode === 'light'
                ? palette.secondaryGray.darker
                : palette.common.white,
          },
        };
      },
    },
  },
};
