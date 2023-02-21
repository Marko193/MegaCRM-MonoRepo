interface ArrowDownIconProps {
  width?: string;
  height?: string;
  color?: string;
  pathFill?: string;
}

export const ArrowDownIcon = ({
  width = '24px',
  height = '26px',
  color = 'none',
  pathFill = '#FFA31A',
}: ArrowDownIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 26'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M7 10.679L12 16.0184L17 10.679H7Z' fill={pathFill} />
    </svg>
  );
};
