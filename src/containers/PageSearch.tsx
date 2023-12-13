import { FC, useEffect, useReducer, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import SectionSliderCollections from "components/SectionSliderLargeProduct";
import SectionPromo1 from "components/SectionPromo1";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import ProductCard from "components/ProductCard";
import { fetchGlobalSearch } from "redux/GlobalSearch/fetchGlobalSearch";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import noproduct from "images/collections/noproduct.png";
import { useHistory } from "react-router-dom";
import SidebarFilters from "./SidebarFilters";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import "./style.css";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import TabFiltersOLD from "components/TabFilters_old";
import { Transition } from "@headlessui/react";

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  //Hooks
  const history = useHistory();
  const queryParams = new URLSearchParams(history.location.search);

  //Get params from URL
  const searchCategory: any = queryParams.get("category");
  const searchParam: any = queryParams.get("search");
  const convertedParam = atob(searchParam);
  const convertedCategory = atob(searchCategory);
  useEffect(() => {
    setMenuOption({ menuValue: convertedCategory });
    setSearchFilters({
      searchValue: convertedParam,
      searchCategory: convertedCategory,
    });
  }, []);

  //States and reducers
  const [searchFilters, setSearchFilters] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      searchValue: convertedParam,
      searchCategory: "",
      searchError: false,
      sub_category_data: [],
    }
  );
  const [limit, setLimit] = useState<number>(6);
  const [loader, setLoader] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  //States and reducers End

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

  //Category Drown Down handling
  const [menuOption, setMenuOption] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      isMenuOpen: false,
      menuValue: "",
    }
  );

  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleMenuButtonClick = () => {
    setMenuOption({ isMenuOpen: !menuOption.isMenuOpen });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOption({ isMenuOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  //Category Drown Down handling End

  //Selectors
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const isSearchLoading = useSelector(
    (state: any) => state.GlobalSearch.isSearchLoading
  );
  const searchedData = useSelector(
    (state: any) => state.GlobalSearch.searchedData
  );
  const categories = useSelector(
    (state: any) => state.NavBar?.data?.data?.navbar
  );
  //Selectors End

  //Dispatch
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     fetchGlobalSearch({
  //       loginToken: loginToken,
  //       filter: {
  //         searchValue: convertedParam,
  //         searchCategory: convertedCategory,
  //         onSale: sideBarFilters.onSale,
  //         priceRange: {
  //           min: sideBarFilters.min,
  //           max: sideBarFilters.max,
  //         },
  //         selectedSubCategories: [],
  //         sortOrder: sideBarFilters.sortOrder,
  //         limit: sideBarFilters.limit,
  //       },
  //       setSideBarFilters: setSideBarFilters,
  //     })
  //   );

  //   getSubCategories(convertedCategory);
  // }, [loginToken]);

  useEffect(() => {
    dispatch(
      fetchGlobalSearch({
        loginToken: loginToken,
        filter: {
          searchValue: searchFilters.searchValue,
          searchCategory:
            menuOption.menuValue === ""
              ? convertedCategory
              : menuOption.menuValue,
          onSale: sideBarFilters.onSale,
          priceRange: {
            min: sideBarFilters.min,
            max: sideBarFilters.max,
          },
          selectedSubCategories: sideBarFilters.selectedSubCategories,
          sortOrder: sideBarFilters.sortOrder,
          limit: sideBarFilters.limit,
          loader: true,
        },
        setSideBarFilters: setSideBarFilters,
      })
    );
  }, [
    sideBarFilters.onSale,
    sideBarFilters.selectedSubCategories,
    sideBarFilters.sortOrder,
    sideBarFilters.limit,
    loginToken,
  ]);

  const ApiCall = () => {
    dispatch(
      fetchGlobalSearch({
        loginToken: loginToken,
        filter: {
          searchValue: searchFilters.searchValue,
          searchCategory: menuOption.menuValue,
          onSale: sideBarFilters.onSale,
          priceRange: {
            min: sideBarFilters.min,
            max: sideBarFilters.max,
          },
          selectedSubCategories: sideBarFilters.selectedSubCategories,
          sortOrder: sideBarFilters.sortOrder,
          limit: sideBarFilters.limit,
        },
        setSideBarFilters: setSideBarFilters,
      })
    );
  };
  //Dispatch End

  //Get Sub Categories
  const getSubCategories = (category: string) => {
    if (category === "All Categories") {
      let tempArray: any = [];

      categories.map((category: any) => {
        if (category?.sub_categories.length > 0)
          category.sub_categories.map((subCategory: any) => {
            tempArray.push(subCategory.sub_category_name);
          });
      });

      setSearchFilters({
        sub_category_data: tempArray,
      });

      setSideBarFilters({
        subCategories: tempArray,
      });
    } else {
      let tempArray: any = categories.filter(
        (fl: any) => fl.category_name === category
      );

      let categoryArray: any = [];

      if (tempArray && tempArray.length > 0) {
        if (tempArray[0].sub_categories?.length > 0)
          tempArray[0].sub_categories?.map((items: any) => {
            categoryArray.push(items.sub_category_name);
          });
      }

      setSearchFilters({
        sub_category_data: categoryArray,
      });

      setSideBarFilters({
        subCategories: categoryArray,
      });
    }
  };
  //Get Sub Categories End

  //Handle Search
  const handleSearchParam = (e: any) => {
    setSearchFilters({ searchValue: e.target.value });
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    if (
      searchFilters.searchValue === "" ||
      searchFilters.searchValue.length < 3
    ) {
      history.push("/");
    }
    // else if (searchFilters.searchValue.length < 3) {
    //   setSearchFilters({ searchError: true });
    // }
    else {
      setSearchFilters({ searchError: false, limit: 6 });
      dispatch(
        fetchGlobalSearch({
          loginToken: loginToken,
          filter: {
            searchValue: searchFilters.searchValue,
            searchCategory: menuOption.menuValue,
            onSale: sideBarFilters.onSale,
            priceRange: {
              min: sideBarFilters.min,
              max: sideBarFilters.max,
            },
            selectedSubCategories: sideBarFilters.selectedSubCategories,
            sortOrder: sideBarFilters.sortOrder,
            limit: sideBarFilters.limit,
            loader: true,
          },
          setSideBarFilters: setSideBarFilters,
        })
      );
    }
  };

  //Handle Search End
  const showMeMore = (limit: number) => {
    setSideBarFilters({
      limit: sideBarFilters.limit + 6,
      loader: true,
    });
  };
  return isSearchLoading === true && loader === false ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        minHeight: "100vh",
        minWidth: "100vw",
        position: "absolute",
        zIndex: "999999999",
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
    <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>Search || Askari Mall</title>
      </Helmet>

      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />

      {/*Search Bar*/}
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7  ">
          <div className="flex ">
            {/*Category Drop Down*/}
            <div className="relative inline-block text-left ">
              <span className="tooltip">
                <button
                  type="button"
                  className="inline-flex w-[140px] justify-center rounded-l-full bg-white px-4 pt-4 h-[3.75rem] text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
                  id="menu-button"
                  aria-expanded={menuOption.isMenuOpen ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={handleMenuButtonClick}
                  data-tooltip={menuOption.menuValue}
                >
                  <span className="tooltiptext">{menuOption.menuValue}</span>
                  {menuOption.menuValue.slice(0, 9) + "..."}

                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>

              {menuOption.isMenuOpen && (
                <div
                  ref={menuRef}
                  className="no-scrollbar overflow-y-auto h-[250px]  lg:h-[230px] xl:h-[288px] 2xl:h-[470px]  absolute top-[55px] left-0 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button
                      type="submit"
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      id="menu-item-3"
                      onClick={() => {
                        setSideBarFilters({ selectedSubCategories: [] });
                        setMenuOption({ menuValue: "All Categories" });
                        getSubCategories("All Categories");
                        setMenuOption({ isMenuOpen: false });
                      }}
                    >
                      All Categories
                    </button>
                    {categories.length > 0 &&
                      categories.map((items: any, index: number) => {
                        return (
                          <button
                            key={index}
                            type="submit"
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                            role="menuitem"
                            id="menu-item-3"
                            onClick={() => {
                              setSideBarFilters({ selectedSubCategories: [] });
                              setMenuOption({ menuValue: items.category_name });
                              getSubCategories(items.category_name);
                              setMenuOption({ isMenuOpen: false });
                            }}
                          >
                            {items.category_name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            <form className="relative w-full " onSubmit={handleSearchSubmit}>
              <label
                htmlFor="search-input"
                className="text-neutral-500 dark:text-neutral-300"
              >
                <span className="sr-only">Search all icons</span>

                <Input
                  className={`shadow-lg rounded-r-full border-0 dark:border drop-shadow-sm ${
                    searchFilters.searchError === true
                      ? "focus:ring-red-600"
                      : "focus:ring-primary-200"
                  }`}
                  id="search-input"
                  type="search"
                  placeholder="Type your keywords"
                  sizeClass="pl-14 py-5 pr-5 md:pl-16"
                  rounded="rounded-none"
                  value={searchFilters.searchValue}
                  onChange={handleSearchParam}
                />

                <ButtonCircle
                  className={`absolute right-2.5 top-1/2 transform -translate-y-1/2 focus:ring focus:ring-opacity-50 ${
                    searchFilters.searchError === true
                      ? "focus:ring-red-600"
                      : "focus:ring-primary-400"
                  }`}
                  size=" w-11 h-11"
                  type="submit"
                  onClick={handleSearchSubmit}
                >
                  <i className="las la-arrow-right text-xl"></i>
                </ButtonCircle>

                <span className="flex items-center absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "5pt" }}
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {searchFilters.searchError && (
                  <small
                    className="text-red-700 text-opacity-50 text-sm"
                    style={{ position: "absolute", marginTop: "5pt" }}
                  >
                    Please search at least 3 characters!
                  </small>
                )}
              </label>
            </form>
          </div>
        </header>
      </div>

      {/*Product Handling*/}
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
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
                  }}
                >
                  <svg className={`w-6 h-6`} viewBox="0 0 24 24" fill="none">
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

            {/*Product Loop*/}
            <>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <>
                  {searchedData?.length > 0 && (
                    <>
                      <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                        {searchedData.map((item: any) => (
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
                        ))}
                      </div>

                      {/* PAGINATION */}
                      {sideBarFilters.showMoreFlag && (
                        <div className="flex justify-center items-center mt-12 lg:mt-16">
                          <ButtonPrimary
                            loading={isSearchLoading === true ? true : false}
                            onClick={() => {
                              showMeMore(sideBarFilters.limit + 6);
                            }}
                          >
                            Show me more123
                          </ButtonPrimary>
                        </div>
                      )}
                    </>
                  )}

                  {/*No Products Found*/}
                  {searchedData?.length === 0 && (
                    <div style={{ marginTop: "10%", marginBottom: "10%" }}>
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
                  )}
                </>
              </div>
            </>
          </div>
        </main>

        {/* === SECTION 5 === */}
        {/* <hr className="border-slate-200 dark:border-slate-700" />
        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* SUBCRIBES */}
        {/* <SectionPromo1 /> */}
      </div>
    </div>
  );
};

export default PageSearch;
