import React, { useEffect, useState, FC, Fragment, useReducer } from "react";
import { Helmet } from "react-helmet";
import ProductCard from "components/ProductCard";
import SidebarFilters from "./SidebarFilters";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SectionPromo1 from "components/SectionPromo1";
import Radio from "shared/Radio/Radio";
import { fetchCategoryDetail } from "../redux/Category/fetchCategoryDetail";
import Loader from "react-ts-loaders";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Dialog, Popover, Transition } from "@headlessui/react";
import noproduct from "images/collections/noproduct.png";
import "../App.css";
import TabFiltersOLD from "components/TabFilters_old";
import { ColorRing } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import SectionSliderCollections from "components/SectionSliderLargeProduct";

export interface PageCollection2Props {
  className?: string;
}
const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "MOST_POPULAR" },
  { name: "Best Rating", id: "BEST_RATING" },
  { name: "Newest", id: "NEWEST" },
  { name: "Price Low - High", id: "PRICE_AESC" },
  { name: "Price High - Low", id: "PRICE_DESC" },
  { name: "None", id: "NONE" },
];

const PageCollection2: FC<PageCollection2Props> = ({ className = "" }) => {
  const history = useHistory();

  // states starts here
  const [selectedTitle, setSelectedTitle] = useState([]);
  const [sortOrderStates, setSortOrderStates] = useState<any>("");
  const [isOpen, setIsOpen] = useState(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(6);

  // states ends here

  // states starts here
  const dispatch = useDispatch();
  // states ends here

  // useSelector starts here
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);

  const CategoryDetail: any = useSelector(
    (state: any) => state.CategoryDetail.categoryDetails?.data?.products
  );
  // const isSearchLoading = useSelector(
  //   (state: any) => state.CategoryDetail.categoryDetailsIsLoading
  // );

  const searchedData = useSelector(
    (state: any) => state.GlobalSearch.searchedData
  );
  const categoryLoader = useSelector(
    (state: any) => state.CategoryDetail.categoryDetailsIsLoading
  );

  const subCategories = useSelector(
    (state: any) => state.CategoryDetail.categoryDetails?.data?.sub_categories
  );
  let categoryProducts;
  categoryProducts = CategoryDetail?.map((item: any) => item.product_info);
  // useSelector ends here

  // params starts here
  const { categoryName } = useParams<{
    categoryName?: string | any;
  }>();

  let categoryNameDecoded: any = atob(categoryName);

  const searchParams = new URLSearchParams(history.location.search);
  const myQueryParam: any = searchParams.get("sub_category");
  let subCategoryNameDecoded: any = atob(myQueryParam);

  // params ends here

  // useReducer starts here
  const [sideBarFilters, setSideBarFilters] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      subCategories: [],
      min: 0,
      max: 999999,
      onSale: false,
      CategoryName: categoryNameDecoded,
      selectedSubCategories:
        myQueryParam === null ? [] : [subCategoryNameDecoded],
      sortOrder: "",
      loader: false,
      limit: 6,
    }
  );
  // useReducer ends here

  // useEffect starts here

  useEffect(() => {
    setSideBarFilters({ subCategories: subCategories });
  }, [subCategories]);

  useEffect(() => {
    dispatch(
      fetchCategoryDetail({
        limit: limit,
        loginToken: loginToken,
        filters: sideBarFilters,
      })
    );
    setSideBarFilters({ subCategories: subCategories });
  }, [loginToken, limit]);

  const ApiCall = () => {
    dispatch(
      fetchCategoryDetail({
        limit: limit,
        loginToken: loginToken,
        filters: sideBarFilters,
      })
    );
  };
  const showMeMore = (limit: number) => {
    setLimit(limit);
    setLoader(true);

    dispatch(
      fetchCategoryDetail({
        loginToken: loginToken,
        limit: limit,
        filters: sideBarFilters,
      })
    );
    // console.log("SHOW ME MORE DATA: ", productData);
  };
  useEffect(() => {
    if (categoryName && navBar) {
      dispatch(
        fetchCategoryDetail({
          loginToken: loginToken,
          limit: limit,
          filters: sideBarFilters,
        })
      );
    }
  }, [
    categoryName,
    navBar,
    sideBarFilters.onSale,
    sideBarFilters.sortOrder,
    selectedTitle,
    sideBarFilters.selectedSubCategories,
    limit,
  ]);

  // useEffect ends here

  // functions for sorting starts
  const handleApplyClick = () => {
    dispatch(
      fetchCategoryDetail({
        loginToken: loginToken,
        limit: limit,
        filters: sideBarFilters,
      })
    );
  };

  const handleClearClick = () => {
    setSideBarFilters({ sortOrder: "" });
    dispatch(
      fetchCategoryDetail({
        loginToken: loginToken,
        limit: limit,
        filters: { ...sideBarFilters, sortOrder: "" },
      })
    );
  };
  // functions for sorting ends

  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsSortOrder = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm border rounded-full focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${
                  !!sortOrderStates.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                } 
                `}>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path
                  d="M11.5166 5.70834L14.0499 8.24168"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5166 14.2917V5.70834"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48327 14.2917L5.94995 11.7583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.48315 5.70834V14.2917"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2">
                {sideBarFilters.sortOrder === "NONE" ||
                sideBarFilters.sortOrder === ""
                  ? "Sort Order"
                  : DATA_sortOrderRadios.filter(
                      (i) => i.id === sideBarFilters.sortOrder
                    )[0]?.name}
              </span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-800"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_sortOrderRadios.map((item) => (
                      <Radio
                        id={item.id}
                        key={item.id}
                        name="radioNameSort"
                        label={item.name}
                        defaultChecked={sortOrderStates === item.id}
                        onChange={(e: any) => {
                          setSideBarFilters({
                            sortOrder: e,
                          });
                        }}
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5">
                      <span onClick={() => handleClearClick()}>Clear</span>
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5">
                      <span onClick={handleApplyClick}>Apply</span>
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  return (
    <>
      {categoryProducts?.length < 0 ? (
        <>
          <Loader
            type="dotspinner"
            color="#080708"
            size={100}
            className="loader"
          />
        </>
      ) : (
        <div
          className={`nc-PageCollection2 ${className}`}
          data-nc-id="PageCollection2">
          <Helmet>
            <title>Category || Askari Mall Ecommerce Template</title>
          </Helmet>
          {categoryLoader && loader === false ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                minHeight: "100vh",
                minWidth: "100vw",
                position: "absolute",
                zIndex: "99999",
              }}>
              {/* Loader */}
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#cbe5f7", "#0DA5E9", "#cbe5f7", "#0DA5E9", "#cbe5f7"]}
              />
            </div>
          ) : (
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
              <div className="space-y-10 lg:space-y-14">
                {/* HEADING */}
                <div className="max-w-screen-sm">
                  <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    {categoryNameDecoded ? categoryNameDecoded : "Loading..."}
                  </h2>

                  <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                    We not only help you design exceptional products, but also
                    make it easy for you to share your designs with more
                    like-minded people.
                  </span>
                </div>

                {/* <div className="sortOrder flex justify-end ...">
                  <div className="hidden sm:block md:hidden lg:block xl:block">
                    {renderTabsSortOrder()}
                  </div>
                </div> */}
                <hr
                  className="border-slate-200 dark:border-slate-700"
                  style={{ marginTop: "2rem" }}
                />

                <div className="container lg:pb-1 lg:pt-1 space-y-16 lg:space-y-28">
                  <main>
                    <div className="flex flex-col lg:flex-row">
                      {/* Filters */}
                      <div className="hidden md:block lg:w-1/3 xl:w-1/4 pr-4">
                        <SidebarFilters
                          sideBarFilters={sideBarFilters}
                          setSideBarFilters={setSideBarFilters}
                          ApiCall={ApiCall}
                          enableSort={true}
                        />
                      </div>

                      <div className="md:hidden lg:w-1/3 xl:w-1/4 pr-4">
                        <div style={{ marginBottom: "15pt" }}>
                          <ButtonPrimary
                            className="w-full !pr-16"
                            sizeClass="pl-4 py-2.5 sm:pl-6"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}>
                            <svg
                              className={`w-6 h-6`}
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.87 17.12L18.87 16.12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <span className="block truncate ml-2.5">
                              Filter
                            </span>
                            <span className="absolute top-1/2 -translate-y-1/2 right-5">
                              <ChevronDownIcon
                                className={`w-5 h-5 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                                aria-hidden="true"
                              />
                            </span>
                          </ButtonPrimary>
                        </div>

                        <div style={{ marginBottom: "12pt" }}>
                          <Transition
                            show={isOpen}
                            enter="transition-opacity duration-150"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <TabFiltersOLD
                              sideBarFilters={sideBarFilters}
                              setSideBarFilters={setSideBarFilters}
                              ApiCall={ApiCall}
                            />
                          </Transition>
                        </div>
                      </div>

                      {/*Product Loop*/}
                      {categoryLoader === true ? (
                        <div style={{ marginLeft: "35%", marginTop: "10%" }}>
                          {/* Loader */}
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                              "#cbe5f7",
                              "#0DA5E9",
                              "#cbe5f7",
                              "#0DA5E9",
                              "#cbe5f7",
                            ]}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
                          <div className="flex-1 ">
                            <>
                              {CategoryDetail?.length > 0 && (
                                <>
                                  <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                                    {CategoryDetail?.map((item: any) => (
                                      <div key={item?.product_info?.id}>
                                        <ProductCard
                                          likeItem={item.is_liked}
                                          product={item}
                                          productData={item.product_info}
                                          productVarients={
                                            item?.product_variants?.length > 0
                                              ? item?.variants_parent_child_relation
                                              : []
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}

                              {/*No Products Found*/}
                              {CategoryDetail?.length === 0 && (
                                <div
                                  style={{
                                    marginTop: "10%",
                                    marginBottom: "10%",
                                  }}>
                                  <center>
                                    <p
                                      style={{
                                        fontSize: "1.5rem",
                                        color: "#c5c5c5",
                                      }}>
                                      <img
                                        style={{
                                          marginBottom: "1rem",
                                        }}
                                        src={noproduct}
                                        alt="no_products_found"
                                        className="colorized w-20 lg:w-50"
                                      />
                                      No Products Found
                                    </p>
                                  </center>
                                </div>
                              )}
                            </>
                            {(CategoryDetail?.length >= limit ||
                              categoryLoader === true) && (
                              <div style={{ display: "block" }}>
                                <div className="flex justify-center items-center mt-10 mb-12">
                                  <ButtonPrimary
                                    loading={
                                      categoryLoader === true ? true : false
                                    }
                                    onClick={() => {
                                      showMeMore(limit + 6);
                                    }}>
                                    Show me more
                                  </ButtonPrimary>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </main>
                </div>
              </div>

              {/* === SECTION 5 === */}
              {/* <hr className="border-slate-200 dark:border-slate-700" />

      <SectionSliderCollections />
      <hr className="border-slate-200 dark:border-slate-700" /> */}

              {/* SUBCRIBES */}
              {/* <SectionPromo1 /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PageCollection2;
