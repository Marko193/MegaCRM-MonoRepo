import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ThemeConfig,
  initI18n,
  Toast,
  store,
  persistor,
} from '@mega-dev-crm/features';
import App from './app/app';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

initI18n();

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeConfig>
          <App />
          <Toast />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  </StrictMode>
);
