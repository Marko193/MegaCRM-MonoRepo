import { alpha } from '@mui/material';

export const ToggleButtonGroup = {
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme: { palette, typography } }: any) => {
        return {
          '& 	.MuiToggleButtonGroup-grouped': {
            color: palette.text.secondary,
            backgroundColor: 'transparent',
            border: `0.5px solid ${palette.common.default}`,
            fontSize: typography.h3.fontSize,
            fontWeight: typography.h2.fontWeight,
            textTransform: 'capitalize',
            height: '35px',
            '&:hover': {
              backgroundColor: alpha(palette.common.default, 0.12),
              color: palette.text.default,
            },
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: alpha(palette.common.default, 0.12),
              color: palette.text.default,
            },
          },
        };
      },
    },
  },
};
