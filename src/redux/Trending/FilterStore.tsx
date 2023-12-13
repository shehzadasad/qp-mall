import { createSlice } from "@reduxjs/toolkit";

interface FilterData {
  filterData: {
    minPrice: number;
    maxPrice: number;
    isOnSale: boolean;
    category: string;
    sortOrder: string;
    sub_category_data: string[];
  };
}

const storeFilterDataSlice = createSlice({
  name: "data/storeFilterData",
  initialState: {
    filterData: {
      minPrice: 10,
      maxPrice: 50000,
      isOnSale: false,
      category: "Others",
      sortOrder: "NONE",
      sub_category_data: [],
    },
  } as FilterData,
  reducers: {
    storeFilterData: (state, action: any) => {
      state.filterData = action.payload;
    },
  },
});

export const { storeFilterData } = storeFilterDataSlice.actions;
export const storeFilterReducer = storeFilterDataSlice.reducer;
