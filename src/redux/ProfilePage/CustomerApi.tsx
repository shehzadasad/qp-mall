import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface CustomerData {
  customerData: any[];
  isLoading: boolean;
  customerError: Error | null;
}

interface FetchDataArgs {
  loginToken: string;
}

export const fetchCustomerData: any = createAsyncThunk(
  "data/fetchCustomer",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "v1/ms-customer-api/user"
    )
      .headers({
        "Mall-Authorization": `Bearer ${arg.loginToken}`,

        "x-api-key": "abc123!",
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
        // toast.error("Error!");
      })
      .json();

    // console.log("PRODUCTS => ", response)
    return response;
  }
);

const fetchCustomerDataSlice = createSlice({
  name: "fetchCustomerData",
  initialState: {
    customerData: [],
    isLoading: false,
    customerError: null,
  } as CustomerData,
  reducers: {},
  extraReducers: {
    //New Arrival Products
    [fetchCustomerData.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchCustomerData.fulfilled.type]: (state: any, action: any) => {
      state.customerData = action.payload;
      state.isLoading = false;
    },
    [fetchCustomerData.rejected.type]: (state: any, action: any) => {
      state.customerError = action.error;
    },
    //New Arrival Products End
  },
});

export default fetchCustomerDataSlice.reducer;
