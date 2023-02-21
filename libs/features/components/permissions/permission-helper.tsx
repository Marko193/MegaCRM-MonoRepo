import { CanProps, Permission } from '@mega-dev-crm/data-access';

export const checkPermissionsMatch = (
  userPermissions: Permission[],
  canProps: CanProps
) => {
  let match = false;
  const { permissions = [] } = canProps;
  const permissionsArr = Array.isArray(permissions)
    ? permissions
    : [permissions];
  if (permissionsArr.length === 0) {
    match = true;
  } else {
    match = permissionsArr.some((p) => userPermissions.includes(p));
  }
  return match;
};
