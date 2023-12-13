import { createSlice } from "@reduxjs/toolkit";

interface ProductDetailData {
  productDetail: any;
  productCartData: any;
}

const storeProductDetailSlice = createSlice({
  name: "data/storeProductDetail",
  initialState: {
    productDetail: {},
    productCartData: [],
    IncrementData: {
      id: 0,
      value: 0,
    },
  } as ProductDetailData,
  reducers: {
    storeProductDetail: (state, action: any) => {
      state.productDetail = action.payload;
    },
    storeCartProduct: (state, action: any) => {
      state.productCartData = action.payload;
    },
    incrementQuantity: (state, action: any) => {
      const { id, value } = action.payload;
      if (id) {
        const incrementData = state.productCartData.map((items: any) => {
          if (items.product_info.id === id) {
            return {
              ...items,
              quantity: value,
            };
          } else {
            return items;
          }
        });
        state.productCartData = incrementData;
      }
    },
    decrementQuantity: (state, action: any) => {
      const { id, value } = action.payload;
      if (id) {
        const incrementData = state.productCartData.map((items: any) => {
          if (items.product_info.id === id) {
            return {
              ...items,
              quantity: value,
            };
          } else {
            return items;
          }
        });
        state.productCartData = incrementData;
      }
    },
  },
});

export const { storeProductDetail, storeCartProduct, incrementQuantity } =
  storeProductDetailSlice.actions;
export const storeProductDetailReducer = storeProductDetailSlice.reducer;
