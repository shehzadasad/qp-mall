import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import { setGlobalLoader } from "redux/GlobalLoader/setGlobalLoader";
interface FetchDataArgs {
  loginToken: string;
  filter: any;
  setSideBarFilters?: any;
}
interface GlobalSearchState {
  searchedData: any[];
  isSearchLoading: boolean;
  error: Error | null;
}

export const fetchGlobalSearch: any = createAsyncThunk(
  "data/fetchGlobalSearch",
  async (arg: FetchDataArgs, thunkAPI) => {
    thunkAPI.dispatch(setGlobalLoader(true));

    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/search/global"
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({
        limit: arg.filter.limit,
        offset: 0,
        category:
          arg.filter.searchCategory === "All Categories"
            ? ""
            : arg.filter.searchCategory,
        search_query: arg.filter.searchValue,
        max_price: arg.filter.priceRange.max,
        min_price: arg.filter.priceRange.min,
        on_sale: arg.filter.onSale,
        sort_by: arg.filter.sortOrder,
        sub_categories: arg.filter.selectedSubCategories,
      })
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

    arg.setSideBarFilters({ loader: false });

    if (response.data.length < arg.filter.limit) {
      arg.setSideBarFilters({ showMoreFlag: false });
    } else {
      arg.setSideBarFilters({ showMoreFlag: true });
    }

    if (arg.filter.sortOrder && arg.filter.sortOrder === "NONE") {
      let sortedArray = response.data.sort(
        (a: any, b: any) => a.product_info.id - b.product_info.id
      );

      thunkAPI.dispatch(setGlobalLoader(false));
      return sortedArray;
    } else {
      thunkAPI.dispatch(setGlobalLoader(false));
      return response.data;
    }
  }
);

const globalSearchSlice: any = createSlice({
  name: "fetchGlobalSearch",
  initialState: {
    searchedData: [],
    isSearchLoading: true,
    error: null,
  } as GlobalSearchState,
  reducers: {},
  extraReducers: {
    [fetchGlobalSearch.pending.type]: (state: any, action: any) => {
      state.globalLoader = true;
      state.isSearchLoading = action.meta.arg.filter.loader;
    },
    [fetchGlobalSearch.fulfilled.type]: (state: any, action: any) => {
      state.searchedData = action.payload;
      state.isSearchLoading = false;
    },
    [fetchGlobalSearch.rejected.type]: (state: any, action: any) => {
      state.error = action.error;
    },
  },
});

export default globalSearchSlice.reducer;
