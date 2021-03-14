import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { Route } from '../../app/types';
import { nanoid } from 'nanoid';

import { routes } from '../../constants/routes';

interface RouteState {
  isLoading: boolean;
  routes: Route[];
}

const initialState: RouteState = {
  isLoading: false,
  routes: routes,
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addRoute: {
      reducer: (state, action: PayloadAction<Route>) => {
        state.isLoading = false;
        state.routes.push(action.payload);
      },
      prepare: (route: Route) => {
        return { payload: { ...route, id: nanoid() } };
      },
    },
    deleteRoute: (state) => {
      state.isLoading = false;
      state.routes = state.routes.slice(0, -1);
    },
    deleteAllRoutes: (state) => {
      state.isLoading = false;
      state.routes = [];
    },
  },
});

export const { addRoute, deleteRoute, deleteAllRoutes } = routeSlice.actions;

export const addRouteAsync = (route: Route): AppThunk => (dispatch) => {
  dispatch(routeSlice.actions.setLoading(true));
  setTimeout(() => {
    dispatch(addRoute(route));
    dispatch(routeSlice.actions.setLoading(false));
  }, 1000);
};

export const selectRoutes = (state: RootState) => state.route.routes;
export const selectRoutesLoadingStatus = (state: RootState) =>
  state.route.isLoading;

export default routeSlice.reducer;
