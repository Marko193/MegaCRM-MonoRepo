const PRIMARY = {
  lighter: '#ffd757',
  light: '#FFCC35',
  main: '#FFC422',
  dark: '#FFB61D',
  darker: '#FFA31A',
  contrastText: '#000',
};
const PRIMARY_BLACK = {
  lighter: '#969696',
  light: '#6D6D6D',
  main: '#5A5A5A',
  dark: '#3B3B3B',
  darker: '#1B1B1B',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#A9A9A9',
  light: '#7F7F7F',
  main: '#6A6A6A',
  dark: '#4B4B4B',
  darker: '#292929',
  contrastText: '#fff',
};
const SECONDARY_GRAY = {
  lighter: '#F2F2F2',
  light: '#EAEAEA',
  main: '#C8C8C8',
  dark: '#AAAAAA',
  darker: '#808080',
  contrastText: '#fff',
};
const DEFAULT = {
  main: '#F9FAFB',
  light: '#F8F8F8',
};
const INFO = {
  main: '#4064E3',
};
const ERROR = {
  main: '#F54C4C',
  light: '#C26531',
  lighter: '#E36A8B',
  dark: '#E76868',
  darker: '#404AA5',
};
const SUCCESS = {
  light: '#00BA4A',
  main: '#4ACD7F',
  lighter: '#71D661',
};

const lightPalette = {
  common: {
    black: PRIMARY.contrastText,
    white: PRIMARY_BLACK.contrastText,
    default: PRIMARY.darker,
    main: PRIMARY.main,
  },
  primary: {...PRIMARY},
  secondary: {...SECONDARY},
  secondaryGray: {...SECONDARY_GRAY},
  success: {
    light: SUCCESS.light,
    main: SUCCESS.main,
    lighter: SUCCESS.lighter,
    contrastText: INFO.main,
  },
  warning: {
    main: PRIMARY.darker,
    light: ERROR.lighter,
    dark: ERROR.dark,
    contrastText: ERROR.darker,
  },

  text: {
    primary: PRIMARY_BLACK.darker,
    secondary: SECONDARY_GRAY.darker,
    error: ERROR.main,
    default: PRIMARY.darker,
    disabled: PRIMARY_BLACK.contrastText,
  },
  background: {
    paper: DEFAULT.main,
    default: DEFAULT.light,
    neutral: PRIMARY.contrastText,
  },
};

const darkPalette = {
  common: {
    black: SECONDARY.darker,
    white: PRIMARY_BLACK.contrastText,
    default: PRIMARY.darker,
    main: PRIMARY.main,
  },
  primary: {...PRIMARY_BLACK},
  secondary: {...SECONDARY},
  secondaryGray: {...SECONDARY_GRAY},
  success: {
    light: INFO.main,
    main: SUCCESS.main,
    lighter: SUCCESS.lighter,
    contrastText: INFO.main,
  },
  warning: {
    main: PRIMARY.darker,
    light: ERROR.lighter,
    dark: ERROR.dark,
    contrastText: ERROR.darker,
  },

  text: {
    primary: PRIMARY_BLACK.contrastText,
    secondary: PRIMARY_BLACK.contrastText,
    default: PRIMARY.darker,
    error: ERROR.main,
    disabled: PRIMARY_BLACK.contrastText,
  },
  background: {
    paper: SECONDARY.darker,
    default: SECONDARY.darker,
    neutral: PRIMARY_BLACK.contrastText,
  },
};

export {lightPalette, darkPalette};
