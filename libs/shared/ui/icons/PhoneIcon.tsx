export const PhoneIcon = ({width = 24, height = 24, color = '#808080'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.49821 5.2128 8.69065 6.41806 9.07 7.57C9.12773 7.7432 9.13488 7.92928 9.0906 8.1064C9.04632 8.28352 8.95245 8.44434 8.82 8.57L6.62 10.78C8.06378 13.6188 10.3712 15.9262 13.21 17.37L15.41 15.17C15.61 14.98 15.86 14.88 16.12 14.88C16.22 14.88 16.33 14.9 16.43 14.93Z'
        fill={color}
      />
    </svg>
  );
};
