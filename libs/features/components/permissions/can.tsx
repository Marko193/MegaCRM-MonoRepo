import { FunctionComponent } from 'react';
import { CanProps } from '@mega-dev-crm/data-access';
import { usePermissions } from '@mega-dev-crm/features';
import { checkPermissionsMatch } from './permission-helper';

export const Can: FunctionComponent<CanProps> = (props) => {
  const { children } = props;
  const { permissions: userPermissions } = usePermissions();
  const match = checkPermissionsMatch(userPermissions, props);
  if (match) {
    return <>{children}</>;
  } else {
    return null;
  }
};
