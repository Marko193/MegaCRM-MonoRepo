export const Fab = {
  MuiFab: {
    styleOverrides: {
      root: ({ ownerState, theme: { palette } }: any) => {
        return {
          backgroundColor: palette.common.default,
          color: palette.common.white,
          '&:hover': {
            backgroundColor: palette.common.main,
          },
        };
      },
    },
  },
  MuiSpeedDial: {
    styleOverrides: {
      fab: ({ ownerState, theme: { palette, rounded } }: any) => {
        return {
          borderRadius: rounded.borderRadius,
          '&:hover': {
            backgroundColor: palette.common.main,
          },
        };
      },
    },
  },
  MuiSpeedDialAction: {
    styleOverrides: {
      fab: ({ ownerState, theme: { rounded, palette } }: any) => {
        return {
          background: palette.common.default,
          borderRadius: rounded.borderRadius,
          '&:hover': {
            background: palette.common.main,
          },
        };
      },
      staticTooltipLabel: {
        width: '125px',
        padding: 0,
        borderRadius: 'none',
        backgroundColor: 'none',
        boxShadow: '0 0 0 0',
      },
    },
  },
};
