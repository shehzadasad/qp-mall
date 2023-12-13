import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: any;
  productId: any;
}

interface ProductDetailData {
  productDetail: any[];
  productDetailIsLoading: boolean;
  productDetailError: Error | null;
}

export const fetchProductDetail: any = createAsyncThunk(
  "data/fetchProductDetails",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + `merchant/products/mall/get/${arg.productId}`
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

    return response;
  }
);

const fetchProductDetailsSlice = createSlice({
  name: "fetchProductDetails",
  initialState: {
    productDetail: [],
    productDetailIsLoading: true,
    productDetailError: null,
  } as ProductDetailData,
  reducers: {},
  extraReducers: {
    //Products Detail
    [fetchProductDetail.pending.type]: (state: any) => {
      state.productDetailIsLoading = true;
    },
    [fetchProductDetail.fulfilled.type]: (state: any, action: any) => {
      state.productDetail = action.payload.data;
      state.productDetailIsLoading = false;
    },
    [fetchProductDetail.rejected.type]: (state: any, action: any) => {
      state.productDetailError = action.error;
      state.productDetailIsLoading = false;
    },
    //Products Detail End
  },
});

export default fetchProductDetailsSlice.reducer;
