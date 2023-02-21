import { useEffect, useState } from 'react';

export const useAuthorized = () => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    if (token !== null) {
      setAuth(true);
    }

    return () => setAuth(false);
  }, []);

  return isAuth;
};
