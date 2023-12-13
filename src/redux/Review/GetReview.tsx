import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";
import { number } from "yup/lib/locale";

interface ReviewData {
  reviews: any[];
  isLoading: boolean;
  productId: String | number;
  reviewError: Error | null;
}

interface FetchDataArgs {
  loginToken: string;
  productId: String | number;
}

export const fetchReviews: any = createAsyncThunk(
  "data/fetchReviews",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL +
        `ms-mall/api/products/reviews?product_id=${arg.productId}`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .get()
      .badRequest((err) => {
        toast.error("Invalid input data!");
      })
      .notFound((err) => {
        console.error("==> ", err);
      })
      .unauthorized((err) => {
        toast.error("Invalid Token!");
      })
      .internalError((err) => {
        toast.error("Error!");
      })
      .json();
    //ii

    return response;
  }
);

const fetchReviewSlice = createSlice({
  name: "fetchAllReviews",
  initialState: {
    reviews: [],
    isLoading: false,
    reviewError: null,
    productId: "",
  } as ReviewData,
  reducers: {},
  extraReducers: {
    [fetchReviews.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchReviews.fulfilled.type]: (state: any, action: any) => {
      state.review = action.payload;
      state.isLoading = false;
    },
    [fetchReviews.rejected.type]: (state: any, action: any) => {
      state.reviewError = action.error;
    },
  },
});

export default fetchReviewSlice.reducer;
