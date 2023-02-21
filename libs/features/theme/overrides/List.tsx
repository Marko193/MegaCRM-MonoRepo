export const List = {
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme: { palette, typography, spacing } }: any) => {
        return {
          color:
            palette.mode === 'light'
              ? palette.secondaryGray.darker
              : palette.secondaryGray.contrastText,
          '&.active': {
            color: palette.text.default,
            fontWeight: 600,
          },
          '&:hover': {
            backgroundColor: palette.background.listHover,
          },
          ...typography.body2,
          height: 48,
          position: 'relative',
          textTransform: 'capitalize',
          paddingLeft: spacing(1),
          paddingRight: spacing(2.5),
          '&:before': {
            top: 0,
            right: 0,
            width: 3,
            bottom: 0,
            content: "''",
            display: 'none',
            position: 'absolute',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            backgroundColor: palette.text.default,
          },
        };
      },
    },
  },
};
