export const IconButton = (theme: any) => {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: 'default' },
          style: {
            '&:hover': { backgroundColor: theme.palette.secondaryGray.darker },
          },
        },
        {
          props: { color: 'inherit' },
          style: {
            '&:hover': { backgroundColor: theme.palette.secondaryGray.darker },
          },
        },
      ],
    },
  };
};
