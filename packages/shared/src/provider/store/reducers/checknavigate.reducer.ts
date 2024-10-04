import { createSlice } from "@reduxjs/toolkit";
export interface CheckNavigate {
  check_navigate?: boolean;
  check_naviagte_home?: boolean;
  check_navigate_winner?: boolean;
}
const initialState: CheckNavigate = {
  check_navigate: false,
  check_naviagte_home: false,
  check_navigate_winner: false,
};

const checkNavigateSlice = createSlice({
  name: "checkNavigate",
  initialState,
  reducers: {
    storeCheckNavigate: (state, action) => {
      state.check_navigate = action.payload;
    },
    storeCheckNavigateHome: (state, action) => {
      state.check_naviagte_home = action.payload;
    },
    storeCheckNavigateWinner: (state, action) => {
      state.check_navigate_winner = action.payload;
    },
  },
  extraReducers: () => {},
});

export const {
  storeCheckNavigate,
  storeCheckNavigateHome,
  storeCheckNavigateWinner,
} = checkNavigateSlice.actions;
export default checkNavigateSlice.reducer;
