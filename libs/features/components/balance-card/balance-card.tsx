import {Children, FunctionComponent, ReactNode, useState} from 'react';
import {Collapse, Grid, Link, Stack, Typography, useTheme} from '@mui/material';
import {ArrowDownBalanceIcon, ArrowUpBalanceIcon} from '@mega-dev-crm/shared';
import {nameSpaces, useTypedTranslation} from '@mega-dev-crm/features';

export interface BalanceCardProps {
  title: string;
  children: ReactNode;
  itemsPerRow?: number;
}

export const BalanceCard: FunctionComponent<BalanceCardProps> = ({
  title,
  children,
  itemsPerRow = 3,
}) => {
  const [show, setShow] = useState(false);
  const {
    spacing,
    palette: {mode},
  } = useTheme();
  const {t} = useTypedTranslation(nameSpaces.common);
  const handleClick = () => {
    setShow(!show);
  };
  const arrayOfChildren = Children.toArray(children);

  return (
    <Stack
      p={spacing(2, 2, 1.5)}
      boxShadow='0px 4px 5px rgba(0, 0, 0, 0.1)'
      borderRadius={spacing(1)}
      bgcolor={mode === 'light' ? 'common.white' : 'secondary.dark'}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        pb={spacing(2)}
        width='100%'>
        <Stack>
          <Stack alignItems='center' direction={'row'}>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              mr={spacing(2)}>
              {title}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Link
            component='button'
            underline='none'
            variant='subtitle2'
            color='text.secondary'>
            {t('balanceCard.settings')}
          </Link>
        </Stack>
      </Stack>
      <Stack justifyContent='center'>
        <Stack>
          <Grid container>{arrayOfChildren.slice(0, itemsPerRow)}</Grid>
          {Children.count(children) > itemsPerRow && (
            <Stack>
              <Collapse
                in={show}
                sx={{
                  mt: spacing(2),
                }}>
                <Grid
                  container
                  rowSpacing={2}
                  mb={spacing(1.5)}
                  data-testid='balance-card-expanded-items'>
                  {arrayOfChildren.slice(itemsPerRow)}
                </Grid>
              </Collapse>
              <button
                onClick={handleClick}
                style={{
                  margin: '0 auto',
                }}>
                {show ? <ArrowUpBalanceIcon /> : <ArrowDownBalanceIcon />}
              </button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
