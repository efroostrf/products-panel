import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import dataReducer from './reducers/DataSlice';
import modalsReducer from './reducers/ModalsSlice';
import { categoryApi } from 'services/CategoryService';
import { productApi } from 'services/ProductService';
import { rtkQueryErrorLogger } from 'utils/store/logerMiddleware';

const rootReducer = combineReducers({
  dataReducer,
  modalsReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware()
        .concat(categoryApi.middleware)
        .concat(productApi.middleware)
        .concat(rtkQueryErrorLogger)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
