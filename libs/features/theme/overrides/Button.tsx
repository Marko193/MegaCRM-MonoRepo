export const Button = {
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState, theme: { palette, shape, typography } }: any) => {
        return {
          ...(ownerState.color === 'primary' && {
            backgroundColor: palette.common.default,
            color: palette.common.white,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          }),
          ...(ownerState.color === 'secondary' && {
            backgroundColor: palette.secondaryGray.darker,
            color: palette.common.white,
            '&:hover': {
              backgroundColor: palette.secondary.dark,
            },
          }),

          fontSize: typography.h4.fontSize,
          padding: '9px 20px',
          borderRadius: shape.borderRadius,
        };
      },
    },
  },
};
