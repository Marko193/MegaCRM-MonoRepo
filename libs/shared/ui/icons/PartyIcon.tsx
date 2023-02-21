export const PartyIcon = ({
  width = 27,
  height = 27,
  color = 'none',
  pathFill = '#FFA31A',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.4998 10.3875C22.0498 9.875 21.5873 9.3625 21.0998 8.875L20.7373 8.5375L20.9123 8.3875C21.5236 7.86276 21.9592 7.16315 22.1604 6.38305C22.3616 5.60295 22.3186 4.77992 22.0373 4.025C21.6297 3.17372 20.9843 2.45867 20.1791 1.96623C19.3739 1.47379 18.4434 1.22503 17.4998 1.25V3.75C17.9446 3.74381 18.3829 3.85639 18.7697 4.07612C19.1564 4.29585 19.4775 4.61478 19.6998 5C19.9123 5.5 19.6998 6.05 19.1123 6.6375C19.0248 6.7375 18.9248 6.8 18.8373 6.8875C15.0873 3.875 10.9748 2.175 8.96234 4.1875C8.75153 4.403 8.5783 4.65228 8.44984 4.925V5.05L8.22484 5.7125L2.71234 22.0875C2.50383 22.7046 2.44534 23.3625 2.54171 24.0066C2.63808 24.6508 2.88655 25.2628 3.26652 25.7918C3.6465 26.3208 4.14705 26.7517 4.72672 27.0488C5.30639 27.3458 5.94849 27.5005 6.59984 27.5C7.02514 27.4959 7.44707 27.4241 7.84984 27.2875L24.9998 21.6C25.2106 21.5215 25.3963 21.3877 25.5373 21.2125L25.7998 20.9875C27.5873 19.1875 26.4373 15.725 24.0373 12.3625C25.4624 11.5308 27.1033 11.1434 28.7498 11.25V8.75C26.5465 8.62878 24.3606 9.20147 22.4998 10.3875ZM7.12484 24.9125C6.8411 25.0064 6.53684 25.0196 6.24603 24.9506C5.95522 24.8817 5.6893 24.7332 5.47796 24.5219C5.26662 24.3105 5.11818 24.0446 5.0492 23.7538C4.98022 23.463 4.99343 23.1587 5.08734 22.875L6.78734 17.75C8.00057 20.0636 9.86479 21.9713 12.1498 23.2375L7.12484 24.9125ZM15.8748 22C13.9857 21.4997 12.2624 20.509 10.8795 19.1283C9.49657 17.7475 8.50313 16.0258 7.99984 14.1375L9.24984 10.3875L9.32484 10.5C9.46234 10.775 9.63734 11.0625 9.81234 11.35C9.98734 11.6375 10.0123 11.7125 10.1373 11.9C10.2623 12.0875 10.5498 12.5 10.7748 12.8125C10.9998 13.125 11.0123 13.1625 11.1498 13.3375C11.2873 13.5125 11.6873 14.025 11.9748 14.3625L12.3373 14.8C12.7623 15.2875 13.2123 15.7625 13.6873 16.25C14.1623 16.7375 14.5373 17.05 14.9373 17.5L15.3498 17.85L16.3248 18.6375L16.7873 18.9875C17.1373 19.2375 17.4748 19.4875 17.8248 19.7125L18.2123 19.9625C18.6623 20.2375 19.1123 20.5 19.5498 20.725H19.6123L15.8748 22ZM24.0123 19.2125H23.9373C23.0748 19.6875 19.4873 18.5 15.4498 14.45C15.0248 14.025 14.6248 13.6125 14.2623 13.2L13.8998 12.7625L13.2373 11.9625L12.8748 11.4625C12.7123 11.225 12.5373 11 12.3873 10.775L12.0623 10.25L11.6998 9.6625C11.5998 9.4875 11.5248 9.325 11.4373 9.1625C11.3498 9 11.2498 8.8375 11.1748 8.6625C11.1078 8.51604 11.0494 8.36578 10.9998 8.2125C10.9373 8.05 10.8623 7.8875 10.8123 7.7375C10.7623 7.5875 10.7498 7.5 10.7123 7.35C10.6748 7.2 10.6498 7.075 10.6248 6.95C10.6186 6.84176 10.6186 6.73325 10.6248 6.625C10.6128 6.52537 10.6128 6.42464 10.6248 6.325L10.7623 5.9375C11.2123 5.4875 13.5498 5.9375 16.6748 8.3125C16.1451 8.55158 15.5788 8.69949 14.9998 8.75V11.25C16.3276 11.1736 17.6159 10.77 18.7498 10.075L19.3498 10.65C19.8748 11.175 20.3623 11.7125 20.8248 12.25C20.1093 13.5439 19.8454 15.0394 20.0748 16.5L22.5748 16.0125C22.5012 15.5487 22.5012 15.0763 22.5748 14.6125C22.9563 15.191 23.2948 15.7968 23.5873 16.425C24.2873 18.075 24.2373 19 24.0123 19.2125Z"
        fill={pathFill}
      />
    </svg>
  );
};