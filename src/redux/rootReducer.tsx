import { combineReducers } from "@reduxjs/toolkit";
import NavBarReducer from "./HomePage/NavBarItemsApi";
import CustomerReducer from "./ProfilePage/CustomerApi";
import tokenReducer from "./GenerateToken/GenerateToken";
import fetchAllProductsReducer from "./HomePage/fetchAllProducts";
import fetchProductDetailReducer from "./Product/fetchProductDetail";
import OrderReducer from "./Orders/GetOrderList";
import { storeProductDetailReducer } from "./Product/storeProductDetail";
import { storeFilterReducer } from "./Trending/FilterStore";
import FavouriteReducer from "./Favourites/Favourites";
import ReviewReducer from "./Review/AddReview";
import GetReviewReducer from "./Review/GetReview";
import fetchBrandDetailsReducer from "./Brand/fetchBrandDetails";
import fetchAllBrandsReducer from "./Brand/fetchAllBrands";
import fetchCategoryDetailReducer from "./Category/fetchCategoryDetail";
import searchBrandsReducer from "./Brand/searchBrands";
import globalSearchReducer from "./GlobalSearch/fetchGlobalSearch";
import generateCheckoutUrlReducer from "./Checkout/generateCheckoutUrl";
import { setGlobalLoaderReducer } from "./GlobalLoader/setGlobalLoader";

const rootReducer = combineReducers({
  NavBar: NavBarReducer,
  Customer: CustomerReducer,
  token: tokenReducer,
  products: fetchAllProductsReducer,
  productDetail: fetchProductDetailReducer,
  Orders: OrderReducer,
  storeProductDetail: storeProductDetailReducer,
  storeFilterData: storeFilterReducer,
  Favourites: FavouriteReducer,
  Review: ReviewReducer,
  GetReviews: GetReviewReducer,
  BrandDetails: fetchBrandDetailsReducer,
  AllBrands: fetchAllBrandsReducer,
  CategoryDetail: fetchCategoryDetailReducer,
  SearchAllBrands: searchBrandsReducer,
  GlobalSearch: globalSearchReducer,
  CheckoutURL: generateCheckoutUrlReducer,
  setGlobalLoader: setGlobalLoaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
