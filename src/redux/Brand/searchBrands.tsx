import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: any;
  business_name?: any;
  category?: any;
  sub_category?: any;
}

interface SearchBrandsData {
  brandsData: any[];
  searchBrandsIsLoading: boolean;
  brandsError: Error | null;
}

export const searchAllBrands: any = createAsyncThunk(
  "data/searchAllBrands",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + `ms-mall/api/search_brands`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({
        business_name: arg.business_name,
        category: arg.category,
        sub_category: arg.sub_category,
      })
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

    // console.log("Search All Brands => ", response);

    return response;
  }
);

const searchAllBrandsSlice = createSlice({
  name: "searchAllBrands",
  initialState: {
    brandsData: [],
    searchBrandsIsLoading: true,
    brandsError: null,
  } as SearchBrandsData,
  reducers: {},
  extraReducers: {
    //Brand Detail
    [searchAllBrands.pending.type]: (state: any) => {
      state.searchBrandsIsLoading = true;
    },
    [searchAllBrands.fulfilled.type]: (state: any, action: any) => {
      state.brandsData = action.payload.data;
      state.searchBrandsIsLoading = false;
    },
    [searchAllBrands.rejected.type]: (state: any, action: any) => {
      state.brandsError = action.error;
    },
    //Brand Detail End
  },
});

export default searchAllBrandsSlice.reducer;
