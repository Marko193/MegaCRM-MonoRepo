import {Grid, styled} from '@mui/material';

export const StyledContainerGrid = styled(Grid)(({theme: {palette}}) => ({
  backgroundImage: `url('/assets/SigninBackground.svg')`,
  height: '100vh',
  backgroundColor: palette.mode === 'light' ? 'inherit' : palette.common.white,
}));

export const StyledFormGrid = styled(Grid)(
  ({theme: {palette, breakpoints, spacing}}) => ({
    justifyContent: 'center',
    backgroundImage: `url('/assets/SigninBackground.svg')`,
    backgroundColor:
      palette.mode === 'light' ? palette.common.white : palette.common.black,
    borderRadius: 'unset',
    [breakpoints.up('md')]: {
      borderRadius: '30px 0px 0px 30px',
    },
    padding: spacing(4),
  })
);
