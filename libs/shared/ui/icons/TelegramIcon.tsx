import {useTheme} from '@mui/material';

interface TelegramIconProps {
  width?: string;
  height?: string;
  color?: string;
  lightPathFill?: string;
  darkPathFill?: string;
}

export const TelegramIcon = ({
  width = '18px',
  height = '18px',
  color = 'none',
  lightPathFill = '#1B1B1B',
  darkPathFill = '#FFF',
}: TelegramIconProps) => {
  const {
    palette: {mode},
  } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.4989 2.78774L2.20144 7.91549C1.29394 8.27999 1.29919 8.78624 2.03494 9.01199L5.44894 10.077L13.3479 5.09324C13.7214 4.86599 14.0627 4.98824 13.7822 5.23724L7.38244 11.013H7.38094L7.38244 11.0137L7.14694 14.5327C7.49194 14.5327 7.64419 14.3745 7.83769 14.1877L9.49594 12.5752L12.9452 15.123C13.5812 15.4732 14.0379 15.2932 14.1962 14.5342L16.4604 3.86324C16.6922 2.93399 16.1057 2.51324 15.4989 2.78774Z'
        fill={mode === 'light' ? lightPathFill : darkPathFill}
      />
    </svg>
  );
};
