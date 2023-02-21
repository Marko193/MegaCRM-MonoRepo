/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user/user-slice';
import {
  apiSlice,
  authApiSlice,
  employeeApiSlice,
  membersApiSlice,
  requestsSliceApi,
} from './api-service';
import {createBrowserHistory} from 'history';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blackList: ['userReducer'],
  whiteList: ['api'],
};

const rootReducer = combineReducers({
  userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
  [requestsSliceApi.reducerPath]: employeeApiSlice.reducer,
  [membersApiSlice.reducerPath]: membersApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        apiSlice.middleware,
        authApiSlice.middleware,
        employeeApiSlice.middleware,
        requestsSliceApi.middleware,
        membersApiSlice.middleware,
      ]),
  });
};
export const store = setupStore();

export const persistor = persistStore(store);

export const history = createBrowserHistory();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
