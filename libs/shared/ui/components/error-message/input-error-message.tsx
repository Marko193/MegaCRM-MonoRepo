import {FunctionComponent} from 'react';
import {FormHelperText} from '@mui/material';

export interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage: FunctionComponent<IErrorMessageProps> = ({
  message = '',
}) => {
  return <FormHelperText error={true}>{message}</FormHelperText>;
};
