import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: any;
}

interface AllBrandsData {
  brands: any[];
  brandsIsLoading: boolean;
  brandsError: Error | null;
}

export const fetchAllBrands: any = createAsyncThunk(
  "data/fetchAllBrands",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + `ms-mall/api/all_brands_by_category`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({})
      .badRequest((err) => {
        toast.error("Invalid input data!");
      })
      .notFound((err) => {
        toast.error("Invalid path!");
      })
      .unauthorized((err) => {
        toast.error("Invalid Token!");
      })
      .internalError((err) => {
        toast.error("Error!");
      })
      .json();

    // console.log("All Brands => ", response);

    return response;
  }
);

const fetchAllBrandsSlice = createSlice({
  name: "fetchAllBrands",
  initialState: {
    brands: [],
    brandsIsLoading: true,
    brandsError: null,
  } as AllBrandsData,
  reducers: {},
  extraReducers: {
    //Brand Detail
    [fetchAllBrands.pending.type]: (state: any) => {
      state.brandsIsLoading = true;
    },
    [fetchAllBrands.fulfilled.type]: (state: any, action: any) => {
      state.brands = action.payload.data;
      state.brandsIsLoading = false;
    },
    [fetchAllBrands.rejected.type]: (state: any, action: any) => {
      state.brandsError = action.error;
    },
    //Brand Detail End
  },
});

export default fetchAllBrandsSlice.reducer;
