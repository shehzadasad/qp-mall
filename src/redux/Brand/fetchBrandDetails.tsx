import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import { setGlobalLoader } from "redux/GlobalLoader/setGlobalLoader";

interface FetchDataArgs {
  loginToken: any;
  brandPageProductLimit?: number;
  brandPageProductOffSet?: number;
  brandPageProductMaxPrice?: number;
  brandPageProductMinPrice?: number;
  brandPageSubCategory?: any[];
  merchantUserId?: number;
  sortBy?: any;
  onSale?: any;
  dynamicFilters?: any;
}

interface BrandDetailData {
  brandDetail: any[];
  brandDetailIsLoading: boolean;
  brandDetailError: Error | null;
}

const addQuantityInObject = (data: any) => {
  let tempObject: any = data;
  tempObject.data.map((items: any) => {
    return (items.quantity = 0);
  });
  let result: any = addSelectedVariants(tempObject);
  return result;
};

const addSelectedVariants = (data: any) => {
  let tempObject: any = data;
  tempObject.data.map((items: any) => {
    return (items.selectedVariant = {});
  });
  return tempObject;
};

export const fetchBrandDetail: any = createAsyncThunk(
  "data/fetchBrandDetail",
  async (arg: FetchDataArgs, thunkAPI) => {
    thunkAPI.dispatch(setGlobalLoader(true));
    const response: any = await wretch(
      process.env.REACT_APP_MALL + `ms-mall/api/products/brand_page`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({
        limit: arg.brandPageProductLimit,
        max_price: arg.brandPageProductMaxPrice,
        min_price: arg.brandPageProductMinPrice,
        merchant_user_id: arg.merchantUserId,
        offset: arg.brandPageProductOffSet,
        sub_category: arg.brandPageSubCategory,
        sort_by: arg.sortBy,
        dynamic_filters: arg.dynamicFilters,
        on_sale: arg.onSale,
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

    const sortedArray = [...response.data.products].sort(
      (a, b) => a.product_info.id - b.product_info.id
    );

    let temp: any = {
      ...response,
    };
    console.log(sortedArray);
    temp.data.products = sortedArray;

    thunkAPI.dispatch(setGlobalLoader(false));

    return temp;
  }
);

const fetchBrandDetailsSlice = createSlice({
  name: "fetchBrandDetails",
  initialState: {
    brandDetail: [],
    brandDetailIsLoading: true,
    brandDetailError: null,
  } as BrandDetailData,
  reducers: {},
  extraReducers: {
    //Brand Detail
    [fetchBrandDetail.pending.type]: (state: any) => {
      state.brandDetailIsLoading = true;
    },
    [fetchBrandDetail.fulfilled.type]: (state: any, action: any) => {
      state.brandDetail = action.payload.data;
      state.brandDetailIsLoading = false;
    },
    [fetchBrandDetail.rejected.type]: (state: any, action: any) => {
      state.brandDetailError = action.error;
    },
    //Brand Detail End
  },
});

export default fetchBrandDetailsSlice.reducer;
