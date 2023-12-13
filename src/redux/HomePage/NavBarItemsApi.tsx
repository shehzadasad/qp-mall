import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import { setGlobalLoader } from "redux/GlobalLoader/setGlobalLoader";

interface FetchDataArgs {
  loginToken: string;
}
interface PostsState {
  data: any[];
  isNavBarLoading: boolean;
  error: Error | null;
}

export const fetchNavItems: any = createAsyncThunk(
  "data/fetchNavItems",
  async (arg: FetchDataArgs, thunkAPI) => {
    thunkAPI.dispatch(setGlobalLoader(true));

    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/home/get_items"
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .get()
      .badRequest((err) => {
        toast.error("Invalid input data!");
      })
      .notFound((err) => {
        // console.log("==> ", err);
      })
      .unauthorized((err) => {
        toast.error("Invalid Token!");
      })
      .internalError((err) => {
        toast.error("Error!");
      })
      .json();
    // console.log("RESPONSE", response);
    thunkAPI.dispatch(setGlobalLoader(false));

    return response;
  }
);

const postsSlice = createSlice({
  name: "navBarItems",
  initialState: {
    data: [],
    isNavBarLoading: true,
    error: null,
  } as PostsState,
  reducers: {},
  extraReducers: {
    [fetchNavItems.pending.type]: (state: any) => {
      state.isNavBarLoading = true;
    },
    [fetchNavItems.fulfilled.type]: (state: any, action: any) => {
      state.data = action.payload;
      state.globalLoader = false;
      state.isNavBarLoading = false;
    },
    [fetchNavItems.rejected.type]: (state: any, action: any) => {
      state.error = action.error;
    },
  },
});

export default postsSlice.reducer;
