import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routeReducer from '../components/Route/routeSlice';

export const store = configureStore({
  reducer: {
    route: routeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
