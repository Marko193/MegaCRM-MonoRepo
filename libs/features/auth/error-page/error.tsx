import { FunctionComponent } from 'react';

export interface ErrorPageProps {
  title: string;
}

export const ErrorPage: FunctionComponent<ErrorPageProps> = ({ title }) => {
  return <div className="flex p-20 justify-center">{title}</div>;
};

export default ErrorPage;
