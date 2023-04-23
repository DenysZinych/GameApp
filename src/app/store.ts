import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import gamesSlice from "features/games/gamesSlice/gamesSlice";

export const store = configureStore({
  reducer: {
    games: gamesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
