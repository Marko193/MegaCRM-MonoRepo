import {
  Permission,
  PermissionContextValue,
  PermissionsProviderProps,
} from '@mega-dev-crm/data-access';
import { createContext, FunctionComponent, useState } from 'react';

export const PermissionsContext = createContext<PermissionContextValue | null>(
  null
);

export const PermissionsProvider: FunctionComponent<
  PermissionsProviderProps
> = ({ children }) => {
  const [permissions] = useState<Permission[]>(['user:read']);

  return (
    <PermissionsContext.Provider value={{ permissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};
