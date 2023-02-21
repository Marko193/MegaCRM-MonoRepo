import {useTheme} from '@mui/material';

export const RequestsIcon = ({
  width = 18,
  height = 18,
  lightPathFill = '#808080',
  darkPathFill = '#808080',
}) => {
  const {
    palette: {mode},
  } = useTheme();
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill={mode === 'light' ? lightPathFill : darkPathFill}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.5 3V13.5L5.1 10.8C5.3595 10.605 5.67525 10.5 6 10.5H12C12.3978 10.5 12.7794 10.342 13.0607 10.0607C13.342 9.77936 13.5 9.39782 13.5 9V3C13.5 2.60218 13.342 2.22064 13.0607 1.93934C12.7794 1.65804 12.3978 1.5 12 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3ZM3 10.5V3H12V9H5.5005C5.1758 8.99913 4.85973 9.10448 4.6005 9.3L3 10.5Z'
        fill={mode === 'light' ? lightPathFill : darkPathFill}
      />
      <path
        d='M16.5 16.5V6.75C16.5 6.35218 16.342 5.97064 16.0607 5.68934C15.7794 5.40804 15.3978 5.25 15 5.25V13.5L13.3995 12.3C13.1403 12.1045 12.8242 11.9991 12.4995 12H5.25C5.25 12.197 5.2888 12.392 5.36418 12.574C5.43956 12.756 5.55005 12.9214 5.68934 13.0607C5.82863 13.1999 5.99399 13.3104 6.17598 13.3858C6.35796 13.4612 6.55302 13.5 6.75 13.5H12C12.3247 13.5 12.6405 13.605 12.9 13.8L16.5 16.5Z'
        fill={mode === 'light' ? lightPathFill : darkPathFill}
      />
      <path
        d='M7.875 7.5V5.625M7.875 5.625V3.75M7.875 5.625H9.75M7.875 5.625H6'
        stroke={mode === 'light' ? lightPathFill : darkPathFill}
        strokeLinecap='round'
      />
    </svg>
  );
};
