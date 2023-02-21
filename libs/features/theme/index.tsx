import {
  FC,
  ReactNode,
  useMemo,
  useState,
  createContext,
  useContext,
} from 'react';
import {CssBaseline, useMediaQuery} from '@mui/material';
import {ThemeProvider, createTheme, ThemeOptions} from '@mui/material/styles';
import {typography, breakpoints, customShadows} from './config';
import {ComponentsOverrides} from './overrides/components';

import {lightPalette, darkPalette} from './config/palette';
import {shape, rounded} from './config/shape';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ColorModeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeConfig: FC<ThemeProviderProps> = ({children}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode, prefersDarkMode]
  );

  const themeOptions = useMemo(
    () => ({
      components: {
        ...ComponentsOverrides,
      },
      shape,
      rounded,
      palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPalette),
      },
      typography,
      breakpoints,
      customShadows,
    }),
    [mode]
  );

  const theme = createTheme(themeOptions as ThemeOptions);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
