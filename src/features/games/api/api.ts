import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.rawg.io/api/games";

interface IGamesParams {
  key: string;
  page_size: number;
  page: number;
  search: string;
}

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ key, page_size, page, search }: IGamesParams) => {
    const params = {
      key,
      page_size,
      page,
      search,
    };
    const response = await axios.get(API_URL, { params });
    return response;
  },
);
