import {useTheme} from '@mui/material';

interface EmailDogIconProps {
  width?: string;
  height?: string;
  color?: string;
  lightPathFill?: string;
  darkPathFill?: string;
}

export const EmailDogIcon = ({
  width = '18px',
  height = '18px',
  color = 'none',
  lightPathFill = '#1B1B1B',
  darkPathFill = '#FFF',
}: EmailDogIconProps) => {
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
        d='M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5H12.75V15H9C5.745 15 3 12.255 3 9C3 5.745 5.745 3 9 3C12.255 3 15 5.745 15 9V10.0725C15 10.665 14.4675 11.25 13.875 11.25C13.2825 11.25 12.75 10.665 12.75 10.0725V9C12.75 6.93 11.07 5.25 9 5.25C6.93 5.25 5.25 6.93 5.25 9C5.25 11.07 6.93 12.75 9 12.75C10.035 12.75 10.98 12.33 11.655 11.6475C12.1425 12.315 12.9825 12.75 13.875 12.75C15.3525 12.75 16.5 11.55 16.5 10.0725V9C16.5 4.86 13.14 1.5 9 1.5ZM9 11.25C7.755 11.25 6.75 10.245 6.75 9C6.75 7.755 7.755 6.75 9 6.75C10.245 6.75 11.25 7.755 11.25 9C11.25 10.245 10.245 11.25 9 11.25Z'
        fill={mode === 'light' ? lightPathFill : darkPathFill}
      />
    </svg>
  );
};
