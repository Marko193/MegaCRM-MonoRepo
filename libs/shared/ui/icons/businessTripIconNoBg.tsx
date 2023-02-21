export const BusinessTripIconNoBg = ({
  width = 24,
  height = 24,
  color = 'none',
  imageColor = '#404AA5',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 11L2 15L5.408 16.363C5.91115 16.5642 6.36817 16.8655 6.75133 17.2487C7.1345 17.6318 7.43582 18.0889 7.637 18.592L9 22L13 20L11.79 17.58C11.5715 17.1439 11.52 16.643 11.645 16.1715C11.7701 15.7 12.0631 15.2905 12.469 15.02L14 14L18 21L21 17L18.71 9.531L19.425 8.817C20.837 7.405 22.135 5.135 20.5 3.5C18.865 1.865 16.59 3.16 15.184 4.577L14.464 5.285L7 3L3 6L10 10L8.98 11.531C8.70963 11.9371 8.30018 12.2303 7.8287 12.3555C7.35722 12.4808 6.85623 12.4294 6.42 12.211L4 11Z'
        stroke={imageColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
