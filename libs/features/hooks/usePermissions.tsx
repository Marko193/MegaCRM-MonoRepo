import { useContext } from 'react';
import { PermissionsContext } from '../contexts';

export const usePermissions = () => {
  const permissionsContext = useContext(PermissionsContext);
  if (permissionsContext === null) {
    throw new Error('usePermissions must be inside of PermissionProvider');
  }
  return permissionsContext;
};
