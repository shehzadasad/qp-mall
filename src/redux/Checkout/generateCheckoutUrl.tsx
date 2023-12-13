import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: any;
  data: any;
  phone_number: any;
}

interface GenerateCheckoutURL {
  urlData: any[];
  generateUrlIsLoading: boolean;
  generateUrlError: Error | null;
}

export const generateCheckoutUrl: any = createAsyncThunk(
  "data/generateCheckoutUrl",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + `merchant/products/checkout-url-mall`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .post({
        phone_number: arg.phone_number,
        products: arg.data,
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

    console.log("GENERATE URL DATA => ", response);

    return response;
  }
);

const generateCheckoutUrlSlice = createSlice({
  name: "generateCheckoutUrl",
  initialState: {
    urlData: [],
    generateUrlIsLoading: false,
    generateUrlError: null,
  } as GenerateCheckoutURL,
  reducers: {},
  extraReducers: {
    [generateCheckoutUrl.pending.type]: (state: any) => {
      state.generateUrlIsLoading = true;
    },
    [generateCheckoutUrl.fulfilled.type]: (state: any, action: any) => {
      state.urlData = action.payload;
      state.generateUrlIsLoading = false;
    },
    [generateCheckoutUrl.rejected.type]: (state: any, action: any) => {
      state.generateUrlError = action.error;
    },
  },
});

export default generateCheckoutUrlSlice.reducer;
