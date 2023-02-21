import {FunctionComponent, ReactNode} from 'react';
import {Link, Stack, useTheme} from '@mui/material';

export interface ContactsLineProps {
  value?: string;
  icon: ReactNode;
  isMail?: boolean;
  isPhone?: boolean;
  isTelegram?: boolean;
  isLink?: boolean;
}

export const ContactsLine: FunctionComponent<ContactsLineProps> = ({
  value,
  icon,
  isMail = false,
  isPhone = false,
  isTelegram = false,
  isLink = false,
}) => {
  const {
    palette: {mode},
  } = useTheme();

  return (
    <Stack direction={'row'} alignItems='center' spacing={1}>
      {icon}
      {isLink && (
        <Link
          color={mode === 'light' ? 'common.black' : 'common.white'}
          variant='body2'
          letterSpacing='.5px'
          lineHeight='20px'
          underline='hover'
          href={value}
          target='_blank'
          sx={{
            cursor: 'pointer',
          }}>
          {value}
        </Link>
      )}
      {isMail && (
        <Link
          color={mode === 'light' ? 'common.black' : 'common.white'}
          variant='body2'
          letterSpacing='.5px'
          lineHeight='20px'
          underline='hover'
          href={`mailto: ${value}`}
          sx={{
            cursor: 'pointer',
          }}>
          {value}
        </Link>
      )}
      {isPhone && (
        <Link
          color={mode === 'light' ? 'common.black' : 'common.white'}
          variant='body2'
          letterSpacing='.5px'
          lineHeight='20px'
          underline='hover'
          href={`tel: ${value}`}
          sx={{
            cursor: 'pointer',
          }}>
          {value}
        </Link>
      )}
      {isTelegram && (
        <Link
          color={mode === 'light' ? 'common.black' : 'common.white'}
          variant='body2'
          letterSpacing='.5px'
          lineHeight='20px'
          underline='hover'
          href={`https://t.me/${value}`}
          target='_blank'
          sx={{
            cursor: 'pointer',
            color: mode === 'light' ? 'success.contrastText' : 'common.default',
          }}>
          {`@${value}`}
        </Link>
      )}
    </Stack>
  );
};
