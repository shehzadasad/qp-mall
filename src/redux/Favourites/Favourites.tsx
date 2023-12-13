import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import {
  fetchNewArrivalProducts,
  fetchSaleItems,
} from "redux/HomePage/fetchAllProducts";

interface FetchDataArgs {
  loginToken: string;
  dispatch: any;
}
interface PostFavourite {
  favouriteData: any[];
  isLoadingPostFav: boolean;
  favs: any[];
  favouriteError: Error | null;
}
interface FetchDataArgs {
  payload: any;
}

export const postFavouriteData: any = createAsyncThunk(
  "data/postFavourite",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/add_to_favourites"
    )
      .headers({
        loginToken: arg.loginToken,
      })

      .post(arg.payload)
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

    if (response.message) {
      toast.success(response.message);
    }

    thunkAPI.dispatch(fetchNewArrivalProducts({ loginToken: arg.loginToken }));
    thunkAPI.dispatch(fetchSaleItems({ loginToken: arg.loginToken }));

    return response;
  }
);

export const fetchFavourites: any = createAsyncThunk(
  "data/fetchFavourites",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/favourites"
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

    const sortedArray = response.data.sort(
      (a: any, b: any) => a.product_info.id - b.product_info.id
    );
    return sortedArray;
  }
);

const postFavouriteDataSlice = createSlice({
  name: "postFavouriteData",
  initialState: {
    favouriteData: [],
    isLoadingPostFav: true,
    favs: [],
    favouriteError: null,
  } as PostFavourite,
  reducers: {},
  extraReducers: {
    //post fav
    [postFavouriteData.pending.type]: (state: any) => {
      state.isLoadingPostFav = true;
    },
    [postFavouriteData.fulfilled.type]: (state: any, action: any) => {
      state.favouriteData = action.payload;
      state.isLoadingPostFav = false;
    },
    [postFavouriteData.rejected.type]: (state: any, action: any) => {
      state.favouriteData = action.error;
    },
    // get favs
    [fetchFavourites.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchFavourites.fulfilled.type]: (state: any, action: any) => {
      state.favs = action.payload;
      state.isLoading = false;
    },
    [fetchFavourites.rejected.type]: (state: any, action: any) => {
      state.favError = action.error;
    },
  },
});

export default postFavouriteDataSlice.reducer;
