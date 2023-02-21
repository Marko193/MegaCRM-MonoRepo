import {PermissionsProvider, route} from '@mega-dev-crm/features';
import {RouterProvider} from 'react-router-dom';

const App = () => {
  return (
    <PermissionsProvider>
      <RouterProvider router={route} />
    </PermissionsProvider>
  );
};

export default App;
