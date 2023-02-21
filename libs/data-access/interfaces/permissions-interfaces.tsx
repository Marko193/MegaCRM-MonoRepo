import { ReactNode } from 'react';

export interface PermissionSwitchProps {
  children?: ReactNode;
}

export interface CanProps {
  children?: ReactNode;
  permissions?: Permission | Permission[];
}

export type Permission =
  | 'user:write'
  | 'user:read'
  | 'user:admin'
  | 'someother';

export interface PermissionContextValue {
  permissions: Permission[];
}

export interface PermissionsProviderProps {
  children: ReactNode;
}
