import {
  Data,
  EmployeeContextValue,
  // EmployeeProviderProps,
} from '@mega-dev-crm/data-access';
import {createContext, useState} from 'react';

export const CreateEmployeeContext = createContext<EmployeeContextValue | null>(
  {value: null, setValue: () => null}
);

export const CreateEmployeeProvider = ({children}: any) => {
  const [value, setValue] = useState<Data | null>(null);

  return (
    <CreateEmployeeContext.Provider value={{value, setValue}}>
      {children}
    </CreateEmployeeContext.Provider>
  );
};
