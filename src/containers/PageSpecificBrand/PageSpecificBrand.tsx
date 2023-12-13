import ProductCard from "components/ProductCard";
import SidebarFilters from "containers/SidebarFilters";
import React, { useEffect, useReducer, useState } from "react";
import { BrandProfileHeader } from "./components/BrandProfileHeader";
import noproduct from "images/collections/noproduct.png";
import { PRODUCTS } from "data/data";
import TabFilters from "./components/TabFiltersIcon";
import ReviewItem from "components/ReviewItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandDetail } from "redux/Brand/fetchBrandDetails";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Transition } from "@headlessui/react";
import TabFiltersOLD from "components/TabFilters_old";

const PageSpecificBrand = () => {
  const dispatch = useDispatch();
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const productData = useSelector(
    (state: any) => state.BrandDetails.brandDetail
  );

  const brandDetailIsLoading = useSelector(
    (state: any) => state.BrandDetails.brandDetailIsLoading
  );
  console.log(brandDetailIsLoading);
  const { id } = useParams<{ id?: number | any }>();
  const [loader, setLoader] = useState<boolean>(false);

  //Filters
  const [sideBarFilters, setSideBarFilters] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      subCategories: [],
      selectedSubCategories: [],
      min: 0,
      max: 999999,
      onSale: false,
      sortOrder: "NONE",
      limit: 6,
      showMoreFlag: true,
      loader: false,
    }
  );
  const [isOpen, setIsOpen] = useState(true);

  const ApiCall = () => {
    dispatch(
      fetchBrandDetail({
        loginToken: loginToken,
        brandPageProductLimit: limit,
        brandPageProductOffSet: 0,
        brandPageProductMaxPrice: sideBarFilters.max,
        brandPageProductMinPrice: sideBarFilters.min,
        brandPageSubCategory: sideBarFilters.selectedSubCategories,
        merchantUserId: Number(atob(id)),
        sortBy: sideBarFilters.sortOrder,
        dynamicFilters: [],
        onSale: sideBarFilters.onSale,
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchBrandDetail({
        loginToken: loginToken,
        brandPageProductLimit: limit,
        brandPageProductOffSet: 0,
        brandPageProductMaxPrice: sideBarFilters.max,
        brandPageProductMinPrice: sideBarFilters.min,
        brandPageSubCategory: sideBarFilters.selectedSubCategories,
        merchantUserId: Number(atob(id)),
        sortBy: sideBarFilters.sortOrder,
        dynamicFilters: [],
        onSale: sideBarFilters.onSale,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    // console.log("SPECIFIC BRAND DATA: ", productData);
  }, [
    sideBarFilters.sortOrder,
    sideBarFilters.selectedSubCategories,
    sideBarFilters.onSale,
  ]);

  useEffect(() => {
    dispatch(
      fetchBrandDetail({
        loginToken: loginToken,
        brandPageProductLimit: 6,
        brandPageProductOffSet: 0,
        brandPageProductMaxPrice: 100000,
        brandPageProductMinPrice: 0,
        brandPageSubCategory: [],
        merchantUserId: Number(atob(id)),
        sortBy: "NONE",
        dynamicFilters: [],
        onSale: sideBarFilters.onSale,
      })
    );
    // console.log("SPECIFIC BRAND DATA: ", productData);
  }, []);

  const [limit, setLimit] = useState<number>(6);
  const showMeMore = (limit: number) => {
    setLimit(limit);
    setLoader(true);
    dispatch(
      fetchBrandDetail({
        loginToken: loginToken,
        brandPageProductLimit: limit,
        brandPageProductOffSet: 0,
        brandPageProductMaxPrice: sideBarFilters.max,
        brandPageProductMinPrice: sideBarFilters.min,
        brandPageSubCategory: sideBarFilters.selectedSubCategories,
        merchantUserId: Number(atob(id)),
        sortBy: sideBarFilters.sortOrder,
        dynamicFilters: [],
        onSale: sideBarFilters.onSale,
      })
    );
  };

  return (
    <>
      {brandDetailIsLoading && loader === false ? (
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
          }}
        >
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
        <>
          <BrandProfileHeader
            logo={productData["brand_details"]?.logo_path}
            brandName={productData["brand_details"]}
          />
          <div className="container">
            <main>
              {/* LOOP ITEMS */}

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
                      }}
                    >
                      <svg
                        className={`w-6 h-6`}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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

                      <span className="block truncate ml-2.5">Filter</span>
                      <span className="absolute top-1/2 -translate-y-1/2 right-5">
                        <ChevronDownIcon
                          className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}
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
                      leaveTo="opacity-0"
                    >
                      <TabFiltersOLD
                        sideBarFilters={sideBarFilters}
                        setSideBarFilters={setSideBarFilters}
                        ApiCall={ApiCall}
                      />
                    </Transition>
                  </div>
                </div>
                <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
                <div className="flex-1 ">
                  <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                    {productData["products"]?.map(
                      (item: any, index: number) => (
                        <div key={item.product_info.id}>
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
                      )
                    )}
                  </div>
                  {productData["products"].length === 0 &&
                    !brandDetailIsLoading && (
                      <>
                        <div style={{ marginTop: "5%", marginBottom: "10%" }}>
                          <center>
                            <p
                              style={{
                                fontSize: "1.5rem",
                                color: "#c5c5c5",
                              }}
                            >
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
                      </>
                    )}
                  {(productData["products"].length >= limit ||
                    brandDetailIsLoading === true) && (
                    <div style={{ display: "block" }}>
                      <div className="flex justify-center items-center mt-10 mb-12">
                        <ButtonPrimary
                          loading={brandDetailIsLoading === true ? true : false}
                          disabled={
                            brandDetailIsLoading === true ? true : false
                          }
                          onClick={() => {
                            showMeMore(limit + 6);
                          }}
                        >
                          Show me more
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default PageSpecificBrand;
