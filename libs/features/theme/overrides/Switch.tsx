export const Switch = {
  MuiSwitch: {
    styleOverrides: {
      root: ({theme: {spacing}}: any) => ({
        width: '56px',
        height: '20px',
        padding: spacing(0),
        marginRight: spacing('8px'),
      }),
      switchBase: ({theme: {palette, spacing}}: any) => ({
        padding: spacing('1px'),
        '&$checked': {
          '& + $track': {
            backgroundColor: palette.secondaryGray.default,
            opacity: 1,
          },
        },
        '&.Mui-checked': {
          transform: 'translateX(34px)',
        },
      }),
      thumb: ({theme: {palette, spacing}}: any) => ({
        color: palette.common.white,
        width: '17px',
        height: '17px',
        margin: spacing('1px'),
      }),
      track: ({theme: {palette}}: any) => ({
        borderRadius: '25px',
        backgroundColor: palette.common.main,
        opacity: '1',
        '&:after, &:before': {
          color: palette.common.white,
          fontSize: '11px',
          position: 'absolute',
          top: '6px',
        },
        '&:before': {
          content: palette.mode === 'dark' ? "'Dark'" : "''",
          top: '2px',
          left: '10px',
          color: palette.common.black,
        },

        '&:after': {
          content: palette.mode === 'light' ? "'Light'" : "''",
          top: '2px',
          right: '10px',
          color: palette.common.white,
        },
      }),
    },
  },
};
