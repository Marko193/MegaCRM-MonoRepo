import {useTheme} from '@mui/material';

export const ProfileIcon = ({
  width = 14,
  height = 16,
  color = 'none',
  lightPathFill = '#808080',
  darkPathFill = '#FFF',
}) => {
  const {
    palette: {mode},
  } = useTheme();
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 14.75V14C1 11.5147 3.01472 9.5 5.5 9.5H8.5C10.9853 9.5 13 11.5147 13 14V14.75'
        stroke={mode === 'light' ? lightPathFill : darkPathFill}
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M7 7.25C5.34314 7.25 4 5.90686 4 4.25C4 2.59314 5.34314 1.25 7 1.25C8.65683 1.25 10 2.59314 10 4.25C10 5.90686 8.65683 7.25 7 7.25Z'
        stroke={mode === 'light' ? lightPathFill : darkPathFill}
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};
