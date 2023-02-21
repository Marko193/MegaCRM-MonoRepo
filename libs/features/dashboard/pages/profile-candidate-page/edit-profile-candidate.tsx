import { FunctionComponent } from 'react';

export interface EditProfileCandidatePageProps {
  title: string;
}

export const EditProfileCandidatePage: FunctionComponent<
  EditProfileCandidatePageProps
> = ({ title }) => {
  return <div className="flex p-20 justify-center">{title}</div>;
};

export default EditProfileCandidatePage;
