import {FunctionComponent} from 'react';
import {Stack, Typography, useTheme} from '@mui/material';

export interface FormHeaderProps {
  title: string;
  subTitle?: string;
}

export const FormHeader: FunctionComponent<FormHeaderProps> = ({
  title,
  subTitle,
}) => {
  const {spacing} = useTheme();
  return (
    <Stack mb={spacing(7)}>
      <Typography variant='authTitle'>{title}</Typography>
      {subTitle && (
        <Typography variant='authSubTitle' color='text.secondary'>
          {subTitle}
        </Typography>
      )}
    </Stack>
  );
};
