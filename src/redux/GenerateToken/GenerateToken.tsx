import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
interface PostsState {
  loginToken: "";
  loginLoader: boolean;
  error: Error | null;
  mallLogo: string;
}

export const fetchToken: any = createAsyncThunk(
  "data/fetchLoginToken",
  async () => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/get-jwt-token"
    )
      .post({
        sessionID: "xyyfasfusa",
        phoneNumber: "923346960669",
        mallName: process.env.REACT_APP_MALL_NAME,
      })
      .badRequest((err) => {
        toast.error("Invalid input data!");
      })
      .notFound((err) => {
        toast.error("Not Found!");
      })
      .unauthorized((err) => {
        toast.error("Invalid Token!");
      })
      .internalError((err) => {
        toast.error("Error!");
      })
      .json();

    return response;
  }
);

const postsTokenSlice = createSlice({
  name: "fetchToken",
  initialState: {
    loginToken: "",
    loginLoader: true,
    error: null,
    mallLogo: "",
  } as PostsState,

  reducers: {},
  extraReducers: {
    [fetchToken.pending.type]: (state: any) => {
      state.loginLoader = true;
    },
    [fetchToken.fulfilled.type]: (state: any, action: any) => {
      state.loginToken = action.payload.data.token;
      state.mallLogo = action.payload.data.mall_logo;
      state.loginLoader = false;
    },

    [fetchToken.rejected.type]: (state: any, action: any) => {
      state.error = action.error;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { postsSlice } = GenerateToken.actions;

export default postsTokenSlice.reducer;
