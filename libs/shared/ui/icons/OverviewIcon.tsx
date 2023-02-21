export const OverviewIcon = ({ width = 24, height = 24, color = 'none' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 18H15V16H3V18ZM3 6V8H21V6H3ZM3 13H21V11H3V13Z"
        fill="#808080"
      />
    </svg>
  );
};