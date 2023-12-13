import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/others/PageHome";
import Page404 from "containers/Page404/Page404";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import PageCollection from "containers/PageCollection";
import Product from "containers/Product";
import PageSearch from "containers/PageSearch";
import PageHome3 from "containers/PageHome/others/PageHome3";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import ProductDetailPage2 from "containers/ProductDetailPage/ProductDetailPage2";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountOrder from "containers/AccountPage/AccountOrder";
import CartPage from "containers/ProductDetailPage/CartPage";
import CheckoutPage from "containers/PageCheckout/CheckoutPage";
import PageCollection2 from "containers/PageCollection2";
import PageSpecificBrand from "containers/PageSpecificBrand/PageSpecificBrand";

//Pages
import HomePage from "containers/PageHome/HomePage";

//Packages
import { useDispatch, useSelector } from "react-redux";

//Apis
import { fetchToken } from "redux/GenerateToken/GenerateToken";
import PageAllBrands from "containers/PageAllBrands/PageAllBrands";
import SeeCategoryBrands from "containers/PageAllBrands/SeeCategoryBrands";

export const pages: Page[] = [
  // { path: "/home2", exact: true, component: PageHome },
  // { path: "/#", exact: true, component: PageHome },
  { path: "/", exact: true, component: HomePage },
  // { path: "/home3", exact: true, component: PageHome3 },
  // //
  // { path: "/home-header-2", exact: true, component: PageHome },
  // { path: "/", exact: true, component: PageHome },
  {
    path: "/brand/:id",
    exact: true,
    component: PageSpecificBrand,
  },
  { path: "/brands", exact: true, component: PageAllBrands },
  {
    path: "/brands/:name",
    exact: true,
    component: SeeCategoryBrands,
  },
  { path: "/#", exact: true, component: PageHome },
  { path: "/home3", exact: true, component: PageHome3 },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  { path: "/product-detail", component: ProductDetailPage },
  // { path: "/product-detail-2", component: ProductDetailPage2 },
  // //
  { path: "/categories/:categoryName", component: PageCollection2 },
  // {
  //   path: "/categories/:categoryName/:subCategoryName",
  //   component: PageCollection2,
  // },
  { path: "/page-collection", component: PageCollection },
  { path: "/search", component: PageSearch },
  //
  { path: "/account", component: AccountPage },
  { path: "/wishlist", component: AccountSavelists },
  { path: "/account-change-password", component: AccountPass },
  { path: "/account-billing", component: AccountBilling },
  { path: "/account-my-order", component: AccountOrder },
  // //
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage },
  { path: "/product/:productName", component: Product },
  // //
  // { path: "/blog", component: BlogPage },
  // { path: "/blog-single", component: BlogSingle },
  // //
  // { path: "/contact", component: PageContact },
  // { path: "/about", component: PageAbout },
  // { path: "/signup", component: PageSignUp },
  // { path: "/login", component: PageLogin },
  // { path: "/subscription", component: PageSubcription },
];

const Routes = () => {
  const loginLoader = useSelector((state: any) => state.token.loginLoader);
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const globalLoader = useSelector(
    (state: any) => state.setGlobalLoader.globalLoader
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (loginToken === "") {
      dispatch(fetchToken());
    }
  }, []);

  return (
    <BrowserRouter>
      {!globalLoader && !loginLoader && <ScrollToTop />}
      {!globalLoader && !loginLoader && <SiteHeader />}

      {/* {loginLoader && ( 
        <Loader
          type="dotspinner"
          color="#080708"
          size={100}
          className="loader"
        />
      )} */}

      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      {!globalLoader && !loginLoader && <Footer />}
    </BrowserRouter>
  );
};

export default Routes;
