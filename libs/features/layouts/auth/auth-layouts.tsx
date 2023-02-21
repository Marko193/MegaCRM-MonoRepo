import {FunctionComponent, useEffect} from 'react';
import {AuthLayoutContent} from './auth-layout-content';
import {
  useAppSelector,
  DASHBOARD_ROOT,
  SwitchMode,
} from '@mega-dev-crm/features';
import {Outlet, useNavigate} from 'react-router-dom';
import {Grid, IconButton, useTheme} from '@mui/material';
import {ArrowLeftIcon, LogoIcon} from '@mega-dev-crm/shared';
import {StyledContainerGrid, StyledFormGrid} from './auth-layouts.styles';
// import {SwitchMode} from '../../components/navbar/switch-mode';
import {useMatch} from 'react-router';

export const AuthLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.userReducer.accessToken);
  const match = useMatch('/auth/company');

  useEffect(() => {
    if (token) {
      navigate(DASHBOARD_ROOT);
    }
    return () => {};
  }, [token]);

  const {
    palette: {mode},
    palette,
  } = useTheme();

  return (
    <StyledContainerGrid container>
      <Grid item md={4}>
        <AuthLayoutContent
          logo={
            <LogoIcon
              color={mode === 'light' ? 'text.primary' : palette.common.black}
            />
          }
          image='/assets/iPadMini.png'
        />
      </Grid>
      <StyledFormGrid item xs={12} md={8} container>
        <Grid
          container
          justifyContent={match ? 'flex-end' : 'space-between'}
          alignItems='center'
          maxHeight='40px'>
          {!match && (
            <IconButton onClick={() => navigate(-1)} disableRipple>
              <ArrowLeftIcon
                pathFill={
                  mode === 'light' ? palette.common.black : palette.common.white
                }
              />
            </IconButton>
          )}
          <SwitchMode />
        </Grid>
        <Outlet />
      </StyledFormGrid>
    </StyledContainerGrid>
  );
};
