import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Route } from '../../app/types';

import { routes } from '../../constants/routes';
import RouteCalculator from '../../RouteCalculator';

interface RouteState {
  isLoading: boolean;
  routes: Route[];
}

const initialState: RouteState = {
  isLoading: false,
  routes: routes,
};

export const addRoute = createAsyncThunk(
  'route/addRoute',
  async (route: Route) => {
    route.path = await RouteCalculator.getPath(
      route.from,
      route.to,
      route.transport
    );

    return route;
  }
);

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    deleteLastRoute: (state) => {
      state.routes = state.routes.slice(0, -1);
    },
    deleteAllRoutes: (state) => {
      state.routes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRoute.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addRoute.fulfilled, (state, { payload }) => {
      state.routes.push(payload);
      state.isLoading = false;
    });

    builder.addCase(addRoute.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { deleteLastRoute, deleteAllRoutes } = routeSlice.actions;

export const selectRoutes = (state: RootState) => state.route.routes;
export const selectRoutesLoadingStatus = (state: RootState) =>
  state.route.isLoading;

export default routeSlice.reducer;
