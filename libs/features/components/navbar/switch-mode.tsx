import {styled} from '@mui/material/styles';
import {useColorMode} from '@mega-dev-crm/features';
import {Switch} from '@mui/material';

export const SwitchMode = () => {
  const colorMode = useColorMode();
  return <SwitchTheme onClick={colorMode.toggleColorMode} />;
};

export const SwitchTheme = styled(Switch)(({theme}) => ({
  width: '56px',
  height: '20px',
  padding: theme.spacing(0),
  marginRight: theme.spacing(3),
  '& .MuiSwitch-root': {
    width: '56px',
    height: '20px',
    padding: theme.spacing(0),
    marginRight: theme.spacing(2),
  },
  '& .MuiSwitch-switchBase': {
    padding: theme.spacing(0),
    '&$checked': {
      '& + $track': {
        backgroundColor: theme.palette.secondary.dark,
        opacity: 1,
      },
    },
    '&.Mui-checked': {
      transform: 'translateX(34px)',
    },
  },
  '& .MuiSwitch-thumb': {
    color: theme.palette.common.white,
    width: '17px',
    height: '17px',
    margin: theme.spacing(0),
    marginTop: '2px',
    marginLeft: '2px',
  },
  '& .MuiSwitch-track': {
    borderRadius: '25px',
    backgroundColor: theme.palette.primary.dark,
    opacity: '1',
    '&:after, &:before': {
      color: theme.palette.common.white,
      fontSize: '11px',
      position: 'absolute',
      top: '6px',
    },
    '&:before': {
      content: theme.palette.mode === 'dark' ? "'Dark'" : "''",
      top: '2px',
      left: '7px',
      color: theme.palette.common.black,
    },

    '&:after': {
      content: theme.palette.mode === 'light' ? "'Light'" : "''",
      top: '2px',
      right: '10px',
      color: theme.palette.common.white,
    },
  },
}));
