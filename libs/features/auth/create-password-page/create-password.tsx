import { Button } from '@mui/material';
import { FC } from 'react';

export interface CreatePasswordPageProps {
  title: string;
}

export const CreatePasswordPage: FC<CreatePasswordPageProps> = ({ title }) => {
  return (
    <div className="flex p-20 justify-center">
      <Button>{title}</Button>
    </div>
  );
};

export default CreatePasswordPage;
