import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return width < 600;
};
