import {Stack, Typography, Button} from '@mui/material';
import {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

interface HeaderProps {
  title: string;
  quantity?: string;
  button?: string;
  route?: string;
  goBack?: boolean;
}

export const PageHeader: FunctionComponent<HeaderProps> = ({
  title,
  quantity,
  button,
  route,
  goBack,
}) => {
  return (
    <Stack
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      mb={8}>
      <Stack flexDirection='row'>
        <Typography variant='h1'>{title}</Typography>
        {quantity && (
          <Typography
            ml={2}
            fontSize='18px'
            fontWeight='400'
            color='secondaryGray.darker'
            variant='h1'>
            {quantity}
          </Typography>
        )}
      </Stack>
      {button && route && (
        <Link to={route}>
          <Stack>
            <Button
              sx={{
                textTransform: 'capitalize',
              }}>
              {button}
            </Button>
          </Stack>
        </Link>
      )}
    </Stack>
  );
};
