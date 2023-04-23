import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { fetchGames } from "../api";

interface IInitialState {
  loading: boolean;
  value: any;
  error: string;
}

const initialState: IInitialState = {
  loading: false,
  value: [],
  error: "",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGames.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.value = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchGames.rejected, (state, action: any) => {
      state.loading = false;
      state.value = [];
      state.error = action.error;
    });
  },
});

export const selectGames = (state: RootState) => state.games;
export default gamesSlice.reducer;
