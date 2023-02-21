export const Badge = {
  MuiBadge: {
    styleOverrides: {
      root: ({ theme, theme: { palette } }: any) => ({
        '& .MuiBadge-badge': {
          backgroundColor: palette.primary.dark,
          color: theme.palette.primary.dark,
        },
      }),
    },
  },
};
