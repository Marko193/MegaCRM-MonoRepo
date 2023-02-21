export const SicknessNoBgIcon = ({
  width = 24,
  height = 24,
  color = 'none',
  imageColor = '#F54C4C',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15 2.013H9V9H2V15H9V21.987H15V15H22V9H15V2.013Z'
        fill={imageColor}
      />
    </svg>
  );
};
