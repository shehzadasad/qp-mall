import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalLoaderProps {
  globalLoader: boolean;
}

const setGlobalLoaderSlice = createSlice({
  name: "data/storeProductDetail",
  initialState: {
    globalLoader: true,
  } as GlobalLoaderProps,
  reducers: {
    setGlobalLoader: (state, action: PayloadAction<boolean>) => {
      state.globalLoader = action.payload;
    },
  },
});

export const { setGlobalLoader } = setGlobalLoaderSlice.actions;

export const setGlobalLoaderReducer = setGlobalLoaderSlice.reducer;
