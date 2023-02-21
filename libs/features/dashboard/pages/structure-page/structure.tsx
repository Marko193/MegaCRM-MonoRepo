import { FunctionComponent } from 'react';

export interface StructurePageProps {
  title: string;
}

export const StructurePage: FunctionComponent<StructurePageProps> = ({
  title,
}) => {
  return <div className="flex p-20 justify-center">{title}</div>;
};

export default StructurePage;
