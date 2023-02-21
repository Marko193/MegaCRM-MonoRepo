import {FunctionComponent, ReactNode} from 'react';
import {Divider, ListItem, Stack, useTheme} from '@mui/material';

export interface ChildrenListItem {
  icon: ReactNode;
  children: ReactNode;
  isDivider?: boolean;
}

export const ChildrenListItem: FunctionComponent<ChildrenListItem> = ({
  icon,
  children,
  isDivider = true,
}) => {
  const {spacing} = useTheme();
  return (
    <>
      <ListItem
        sx={{
          padding: spacing(1.25, 0),
          gap: spacing(1),
        }}>
        {icon}
        <Stack spacing={0.4}>{children}</Stack>
      </ListItem>
      {isDivider && <Divider />}
    </>
  );
};
