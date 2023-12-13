import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface PostCustomer {
  customerData: any[];
  isLoading: boolean;
  customerError: Error | null;
}
interface FetchDataArgs {
  payload: any;
  loginToken: string;
}

export const postCustomerData: any = createAsyncThunk(
  "data/postCustomer",

  async (arg: FetchDataArgs) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "v1/ms-customer-api/updateuser"
    )
      .headers({
        "Mall-Authorization": `Bearer ${arg.loginToken}`,

        "x-api-key": "abc123!",
      })

      .post(arg.payload)
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

    if (response.status === true) toast.success(response.message);

    return response;
  }
);

const postCustomerDataSlice = createSlice({
  name: "postCustomerData",
  initialState: {
    customerData: [],
    isLoading: false,
    customerError: null,
  } as PostCustomer,
  reducers: {},
  extraReducers: {
    //New Arrival Products
    [postCustomerData.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [postCustomerData.fulfilled.type]: (state: any, action: any) => {
      state.customerData = action.payload;
      state.isLoading = false;
    },
    [postCustomerData.rejected.type]: (state: any, action: any) => {
      state.customerError = action.error;
    },
    //New Arrival Products End
  },
});

export default postCustomerDataSlice.reducer;
