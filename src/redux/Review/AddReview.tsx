import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: string;
  payload: any;
  handleClose: () => void;
}
interface AddReview {
  reviewData: any[];
  isLoadingReview: boolean;
  reviewError: Error | null;
}

export const addReviewData: any = createAsyncThunk(
  "data/addReview",
  async (arg: FetchDataArgs) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/add_review"
    )
      .headers({
        loginToken: arg.loginToken,
      })

      .post(arg.payload)
      .badRequest((err) => {
        const message = JSON.parse(err.message);
        toast.error(message.message);
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

    if (response.result === true) {
      toast.success(response.message);
      arg.handleClose();
    }

    return response;
  }
);

const addReviewDataSlice = createSlice({
  name: "addReviewData",
  initialState: {
    reviewData: [],
    isLoadingReview: false,
    reviewError: null,
  } as AddReview,
  reducers: {},
  extraReducers: {
    //New Arrival Products
    [addReviewData.pending.type]: (state: any) => {
      state.isLoadingReview = true;
    },
    [addReviewData.fulfilled.type]: (state: any, action: any) => {
      state.reviewData = action.payload;
      state.isLoadingReview = false;
    },
    [addReviewData.rejected.type]: (state: any, action: any) => {
      state.reviewData = action.error;
    },
    //New Arrival Products End
  },
});

export default addReviewDataSlice.reducer;
