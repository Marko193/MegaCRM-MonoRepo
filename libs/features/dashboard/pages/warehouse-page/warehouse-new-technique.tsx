import { FunctionComponent } from 'react';

export interface WarehouseNewTechniquePageProps {
  title: string;
}

export const WarehouseNewTechniquePage: FunctionComponent<
  WarehouseNewTechniquePageProps
> = ({ title }) => {
  return <div className="flex p-20 justify-center">{title}</div>;
};

export default WarehouseNewTechniquePage;
