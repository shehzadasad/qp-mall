import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import { setGlobalLoader } from "redux/GlobalLoader/setGlobalLoader";

interface FetchDataArgs {
  loginToken: any;
  selectedValue: string;
  minValue: number;
  maxValue: number;
  onSale: boolean;
  filters: any;
  limit: number;
}
interface CategoryDetailData {
  categoryDetailsIsLoading: boolean;
  categoryDetails: any[];
  categoryDetailsError: Error | null;
}

export const fetchCategoryDetail: any = createAsyncThunk(
  "data/fetchCategoryDetail",
  async (arg: FetchDataArgs, thunkAPI) => {
    thunkAPI.dispatch(setGlobalLoader(true));

    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/category_page"
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({
        limit: arg.limit,
        max_price: arg.filters.max,
        min_price: arg.filters.min,
        offset: 0,
        on_sale: arg.filters.onSale,
        category: arg.filters.CategoryName,
        sub_categories: arg.filters.selectedSubCategories,
        sort_by: arg.filters.sortOrder ? arg.filters.sortOrder : "NONE",
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

    if (arg.filters.sortOrder && arg.filters.sortOrder === "NONE") {
      const sortedArray = [...response.data.products].sort(
        (a, b) => a.product_info.id - b.product_info.id
      );

      let temp: any = {
        ...response,
      };
      temp.data.products = sortedArray;

      thunkAPI.dispatch(setGlobalLoader(false));
      return temp;
    } else {
      thunkAPI.dispatch(setGlobalLoader(false));
      return response;
    }
  }
);

const fetchCategoryDetailSlice = createSlice({
  name: "fetchCategoryDetailList",
  initialState: {
    categoryDetailsIsLoading: false,
    categoryDetails: [],
    categoryDetailsError: null,
  } as CategoryDetailData,
  reducers: {},
  extraReducers: {
    [fetchCategoryDetail.pending.type]: (state: any) => {
      state.categoryDetailsIsLoading = true;
    },
    [fetchCategoryDetail.fulfilled.type]: (state: any, action: any) => {
      state.categoryDetails = action?.payload;
      state.categoryDetailsIsLoading = false;
    },
    [fetchCategoryDetail.rejected.type]: (state: any, action: any) => {
      state.categoryDetailsError = action.error;
    },
  },
});

export default fetchCategoryDetailSlice.reducer;
