const pxToRem = (value: number) => {
  return `${value / 16}rem`;
};

const FONT_PRIMARY = ['-apple-system', 'Roboto', 'sans-serif'].join(',');

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    authTitle: true;
    authSubTitle: true;
    authLink: true;
    authButton: true;
  }
}

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,

  h1: {
    fontWeight: 600,
    fontSize: pxToRem(18),
  },
  h2: {
    fontWeight: 400,
    fontSize: pxToRem(16),
  },
  h3: {
    fontWeight: 500,
    fontSize: pxToRem(14),
  },
  h4: {
    fontWeight: 600,
    fontSize: pxToRem(12),
  },
  h5: {
    fontWeight: 500,
    fontSize: pxToRem(12),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
  },
  body2: {
    fontWeight: 400,
    fontSize: pxToRem(12),
  },
  caption: {
    fontWeight: 400,
    fontSize: pxToRem(9),
  },
  caption1: {
    fontWeight: 400,
    fontSize: pxToRem(18),
  },
  overline: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(36),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
  },
  authTitle: {
    fontWeight: 500,
    lineHeight: 29 / 14,
    fontSize: pxToRem(24),
    fontFamily: 'Montserrat',
  },
  authSubTitle: {
    fontWeight: 500,
    lineHeight: '22px',
    fontSize: pxToRem(18),
    fontFamily: 'Montserrat',
  },
  authLink: {
    fontWeight: 600,
    lineHeight: '17px',
    fontSize: pxToRem(14),
    fontFamily: 'Montserrat',
  },
  authButton: {
    fontWeight: 600,
    lineHeight: '20px',
    fontSize: pxToRem(16),
    fontFamily: 'Montserrat',
  },
};

export {typography};
