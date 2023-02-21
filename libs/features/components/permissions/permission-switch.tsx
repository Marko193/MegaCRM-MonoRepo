import { Children, FunctionComponent, isValidElement, ReactNode } from 'react';
import { Can } from './can';
import { CanProps, PermissionSwitchProps } from '@mega-dev-crm/data-access';
import { usePermissions } from '@mega-dev-crm/features';
import { checkPermissionsMatch } from './permission-helper';

export const PermissionSwitch: FunctionComponent<PermissionSwitchProps> = ({
  children,
}) => {
  const { permissions: userPermissions } = usePermissions();
  let element: ReactNode = null;
  let match = false;

  Children.forEach(children, (child) => {
    if (!match && isValidElement(child) && child.type === Can) {
      element = child;
      match = checkPermissionsMatch(userPermissions, child.props as CanProps);
    }
  });
  return match ? element : null;
};
