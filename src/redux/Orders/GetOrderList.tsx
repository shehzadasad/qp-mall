import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface OrderData {
  orders: any[];
  isLoading: boolean;
  orderError: Error | null;
}

interface FetchDataArgs {
  loginToken: string;
  visible: number;
  offset: number;
}

export const fetchOrders: any = createAsyncThunk(
  "data/fetchOrders",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL +
        `v1/ms-customer-api/order/with_details?limit=${arg.visible}&start=${arg.offset}`
    )
      .headers({
        "Mall-Authorization": `Bearer ${arg.loginToken}`,

        "X-API-Key": "abc123!",
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

    // console.log("PRODUCTS => ", response)
    return response;
  }
);

const fetchOrdersSlice = createSlice({
  name: "fetchAllProducts",
  initialState: {
    orders: [],
    isLoading: false,
    orderError: null,
  } as OrderData,
  reducers: {},
  extraReducers: {
    [fetchOrders.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchOrders.fulfilled.type]: (state: any, action: any) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    [fetchOrders.rejected.type]: (state: any, action: any) => {
      state.orderError = action.error;
    },
  },
});

export default fetchOrdersSlice.reducer;
