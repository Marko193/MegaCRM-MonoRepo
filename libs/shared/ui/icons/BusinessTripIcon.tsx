export const BusinessTripIcon = ({
  width = 20,
  height = 20,
  color = 'none',
  imageColor = '#404AA5',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='10' fill={imageColor} />
      <g clipPath='url(#clip0_405_4513)'>
        <path
          d='M6 9.50007L5 11.5001L6.704 12.1816C6.95557 12.2822 7.18408 12.4328 7.37567 12.6244C7.56725 12.816 7.71791 13.0445 7.8185 13.2961L8.5 15.0001L10.5 14.0001L9.895 12.7901C9.78577 12.572 9.75999 12.3216 9.82252 12.0858C9.88504 11.8501 10.0316 11.6453 10.2345 11.5101L11 11.0001L13 14.5001L14.5 12.5001L13.355 8.76557L13.7125 8.40857C14.4185 7.70257 15.0675 6.56757 14.25 5.75007C13.4325 4.93257 12.295 5.58007 11.592 6.28857L11.232 6.64257L7.5 5.50007L5.5 7.00007L9 9.00007L8.49 9.76557C8.35482 9.9686 8.15009 10.1152 7.91435 10.1778C7.67861 10.2405 7.42811 10.2148 7.21 10.1056L6 9.50007Z'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_405_4513'>
          <rect
            width='12'
            height='12'
            fill='white'
            transform='translate(4 4)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
