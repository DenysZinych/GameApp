import { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";

describe("gamesSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { games: gamesReducer },
    });
  });

  afterEach(() => {
    store = undefined;
  });

  it("should return the initial state", () => {
    const expectedInitialState = {
      loading: false,
      value: [],
      error: "",
    };

    expect(gamesReducer(undefined, {} as AnyAction)).toEqual(
      expectedInitialState,
    );
  });

  it("should handle fetchGames.pending", () => {
    const action = { type: "games/fetchGames/pending" };

    store.dispatch(action);

    const nextState = store.getState().games;

    expect(nextState).toEqual({
      loading: true,
      value: [],
      error: "",
    });
  });

  it("should handle fetchGames.fulfilled", () => {
    const payload = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];

    const action = {
      type: "games/fetchGames/fulfilled",
      payload,
    } as PayloadAction<any>;

    store.dispatch(action);

    const nextState = store.getState().games;

    expect(nextState).toEqual({
      loading: false,
      value: payload,
      error: "",
    });
  });

  it("should handle fetchGames.rejected", () => {
    const error = "Failed to fetch games";

    const action = { type: "games/fetchGames/rejected", error } as any;

    store.dispatch(action);

    const nextState = store.getState().games;

    expect(nextState).toEqual({
      loading: false,
      value: [],
      error,
    });
  });
});
