export const SicknessIcon = ({
  width = 20,
  height = 20,
  color = 'none',
  imageColor = 'white',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#F54C4C" />
      <path
        d="M11.5 5.00647H8.5V8.49997H5V11.5H8.5V14.9935H11.5V11.5H15V8.49997H11.5V5.00647Z"
        fill={imageColor}
      />
    </svg>
  );
};
