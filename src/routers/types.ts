import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  "/home3"?: {};
  //
  "/product-detail"?: {};
  "/product-detail-2"?: {};
  "/page-collection"?: {};
  "/categories/:categoryName"?: {};
  "/categories/:categoryName/:subCategoryName"?: {};
  "/search"?: {};
  "/home-header-2"?: {};
  //
  "/account"?: {};
  "/wishlist"?: {};
  "/account-change-password"?: {};
  "/account-billing"?: {};
  "/account-my-order"?: {};
  //
  "/cart"?: {};
  "/checkout"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};

  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/brands"?: {};
  "/brands/:name"?: {};
  "/brand/:id"?: {};
  "/product/:productName"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
