import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wretch from "wretch";
import { toast } from "react-hot-toast";

interface FetchDataArgs {
  loginToken: string;
  trendingProductsPayload: {
    limit: number;
    offset: number;
    min_price: number;
    max_price: number;
    on_sale: boolean;
    category: string;
    sort_by: string;
    sub_categories: any[];
  };
  similarProductsPayload: any;
}
interface ProductData {
  newArrivalProducts: any[];
  saleItems: any[];
  trendingProducts: any[];
  similarProducts: any[];
  tpIsLoading: boolean;
  isLoading: boolean;
  spIsLoading: true;
  productError: Error | null;
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

export const fetchNewArrivalProducts: any = createAsyncThunk(
  "data/fetchNewArrivalProducts",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL +
        `ms-mall/api/products/new_arrivals?limit=10&&offset=0`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .get()
      .badRequest((err: any) => {
        toast.error("Invalid input data!");
      })
      .notFound((err: any) => {
        console.error("==> ", err);
      })
      .unauthorized((err: any) => {
        toast.error("Invalid Token!");
      })
      .internalError((err: any) => {
        toast.error("Error!");
      })
      .json();

    let result: any = addQuantityInObject(response);
    const sortedArray = [...result.data].sort(
      (a, b) => a.product_info.id - b.product_info.id
    );
    return sortedArray;
  }
);

export const fetchSaleItems: any = createAsyncThunk(
  "data/fetchSaleItems",
  async (arg: FetchDataArgs, thunkAPI) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL +
        `ms-mall/api/products/sale_items?limit=10&offset=0`
    )
      .headers({
        loginToken: arg.loginToken,
      })
      .get()
      .badRequest((err: any) => {
        toast.error("Invalid input data!");
      })
      .notFound((err: any) => {
        // console.log("==> ", err);
      })
      .unauthorized((err: any) => {
        toast.error("Invalid Token!");
      })
      .internalError((err: any) => {
        toast.error("Error!");
      })
      .json();

    let result: any = addQuantityInObject(response);

    const sortedArray = [...result.data].sort(
      (a, b) => a.product_info.id - b.product_info.id
    );

    return sortedArray;
  }
);

export const fetchTrendingProducts: any = createAsyncThunk(
  "data/fetchTrendingProducts",
  async (arg: FetchDataArgs) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/trending"
    )
      .headers({
        loginToken: arg.loginToken,
      })

      .post(arg.trendingProductsPayload)
      .badRequest((err: any) => {
        toast.error("Invalid input data!");
      })
      .notFound((err: any) => {
        // console.log("==> ", err);
      })
      .unauthorized((err: any) => {
        toast.error("Invalid Token!");
      })
      .internalError((err: any) => {
        toast.error("Error!");
      })
      .json();

    let result: any = addQuantityInObject({ data: response.data.products });
    const sortedArray = [...result.data].sort(
      (a, b) => a.product_info.id - b.product_info.id
    );
    return {
      products: sortedArray,
      trending_categories: response.data.trending_categories,
    };
  }
);

export const fetchSimilarProducts: any = createAsyncThunk(
  "data/fetchSimilarProducts",
  async (arg: FetchDataArgs) => {
    const response: any = await wretch(
      process.env.REACT_APP_MALL + "ms-mall/api/products/similar"
    )
      .headers({
        loginToken: arg.loginToken,
      })

      .post(arg.similarProductsPayload)
      .badRequest((err: any) => {
        toast.error("Invalid input data!");
      })
      .notFound((err: any) => {
        // console.log("==> ", err);
      })
      .unauthorized((err: any) => {
        toast.error("Invalid Token!");
      })
      .internalError((err: any) => {
        toast.error("Error!");
      })
      .json();

    let result: any = addQuantityInObject(response);

    const sortedArray = [...result.data].sort(
      (a, b) => a.product_info.id - b.product_info.id
    );

    return sortedArray;
  }
);

const fetchAllproductsSlice = createSlice({
  name: "fetchAllProducts",
  initialState: {
    newArrivalProducts: [],
    saleItems: [],
    trendingProducts: [],
    similarProducts: [],
    isLoading: true,
    tpIsLoading: true,
    spIsLoading: true,
    productError: null,
  } as ProductData,
  reducers: {},
  extraReducers: {
    //New Arrival Products
    [fetchNewArrivalProducts.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchNewArrivalProducts.fulfilled.type]: (state: any, action: any) => {
      state.newArrivalProducts = action.payload;
      state.isLoading = false;
    },
    [fetchNewArrivalProducts.rejected.type]: (state: any, action: any) => {
      state.productError = action.error;
    },
    //New Arrival Products End

    //Sale Items
    [fetchSaleItems.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [fetchSaleItems.fulfilled.type]: (state: any, action: any) => {
      state.saleItems = action.payload;
      state.isLoading = false;
    },
    [fetchSaleItems.rejected.type]: (state: any, action: any) => {
      state.productError = action.error;
    },
    //Sale Items End

    //Trending Items
    [fetchTrendingProducts.pending.type]: (state: any) => {
      state.tpIsLoading = true;
    },
    [fetchTrendingProducts.fulfilled.type]: (state: any, action: any) => {
      state.trendingProducts = action.payload;
      state.tpIsLoading = false;
    },
    [fetchTrendingProducts.rejected.type]: (state: any, action: any) => {
      state.productError = action.error;
    },
    //Trending Items End

    //Similar Products Items
    [fetchSimilarProducts.pending.type]: (state: any) => {
      state.spIsLoading = true;
    },
    [fetchSimilarProducts.fulfilled.type]: (state: any, action: any) => {
      state.similarProducts = action.payload;
      state.spIsLoading = false;
    },
    [fetchSimilarProducts.rejected.type]: (state: any, action: any) => {
      state.productError = action.error;
    },
    //Similar Products Items End
  },
});

export default fetchAllproductsSlice.reducer;
