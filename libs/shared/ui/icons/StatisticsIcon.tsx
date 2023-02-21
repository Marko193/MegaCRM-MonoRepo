export const StatisticIcon = ({
  width = 18,
  height = 18,
  color = 'none',
  pathFill = '#808080',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.25 2.25V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H15.75'
        stroke='#808080'
        strokeWidth='2'
        strokeMiterlimit='5.759'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.25 10.5L8.25 7.5L11.25 10.5L15.75 6'
        stroke={pathFill}
        strokeWidth='2'
        strokeMiterlimit='5.759'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 6H15.75V8.25'
        stroke={pathFill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
