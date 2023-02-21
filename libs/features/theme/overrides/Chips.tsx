export const Chip = {
  MuiChip: {
    styleOverrides: {
      root: ({ownerState, theme: {palette, typography, shape}}: any) => {
        return {
          borderRadius: shape.borderRadius,
          color: palette.common.white,
          fontWeight: typography.body2.fontWeight,
          fontSize: typography.body2.fontSize,
          ...(ownerState.color === 'default' && {
            backgroundColor: palette.secondaryGray.main,
            color: palette.common.black,
            fontWeight: typography.body2.fontWeight,
            fontSize: typography.h3.fontSize,
          }),
          ...(ownerState.color === 'success' && {
            backgroundColor: palette.success.main,
          }),
          ...(ownerState.color === 'error' && {
            backgroundColor: palette.error.main,
          }),
          ...(ownerState.color === 'info' && {
            backgroundColor: palette.info.main,
          }),
          ...(ownerState.color === 'warning' && {
            backgroundColor: palette.common.default,
          }),
        };
      },
    },
  },
};
