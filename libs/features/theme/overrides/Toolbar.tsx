export const Toolbar = {
  MuiToolbar: {
    styleOverrides: {
      root: ({ theme: { palette } }: any) => {
        return {
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
        };
      },
    },
  },
};
