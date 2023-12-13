import React, { FC, Fragment, useState, useReducer, useEffect } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "shared/Radio/Radio";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MySwitch from "components/MySwitch";
import { storeFilterData } from "redux/Trending/FilterStore";
import { useDispatch, useSelector } from "react-redux";
import play from "images/play.svg";
import { BiSearchAlt } from "react-icons/bi";
import toast from "react-hot-toast";

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "MOST_POPULAR" },
  { name: "Best Rating", id: "BEST_RATING" },
  { name: "Newest", id: "NEWEST" },
  { name: "Price Low - High", id: "PRICE_AESC" },
  { name: "Price High - Low", id: "PRICE_DESC" },
  { name: "None", id: "NONE" },
];

const PRICE_RANGE = [1, 50000];
//
export interface TabFiltersProps {
  className?: string;
  categories?: any;
  handleSelectedCategories?: any;
  activeCategory?: string;
}

const TabFilters: FC<TabFiltersProps> = ({
  className = "mb-12",
  categories = [],
  handleSelectedCategories,
  activeCategory,
}) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsIsOnSale] = useState(false);
  const [rangePrices, setRangePrices] = useState([10, 50000]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("NONE");
  //States and reducers
  const dispatch = useDispatch();
  const [searchFilters, setSearchFilters] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      minPrice: rangePrices[0],
      maxPrice: rangePrices[1],
      isOnSale: false,
      sub_category_data: categoriesState,
      sortOrder: sortOrderStates !== "" ? sortOrderStates : "NONE",
      category: activeCategory,
    }
  );
  const total_categories = categories?.filter(
    (category: any) => activeCategory === category?.category
  );
  const sub_categories = total_categories?.map(
    (category: any) => category?.sub_categories?.length
  );

  const [selectedOption, setSelectedOption] = useState<any>(null);
  //States and reducers End
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  useEffect(() => {
    setSearchFilters({
      isOnSale: isOnSale,
    });
  }, [isOnSale]);

  useEffect(() => {
    dispatch(storeFilterData(searchFilters));
  }, [searchFilters]);

  const ApiCallPrice = () => {
    setSearchFilters({
      minPrice: rangePrices[0],
      maxPrice: rangePrices[1],
    });
  };
  const ApiCallPriceClear = () => {
    setSearchFilters({
      minPrice: "",
      maxPrice: "",
    });
  };
  const ApiCallPriceClearCross = () => {
    setSearchFilters({
      minPrice: 0,
      maxPrice: 50000,
    });
  };

  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsCategories = () => {
    let tempArray: any = categories.filter(
      (fl: any) => fl.category === activeCategory
    );

    let subCategoryArray: any = [];

    if (tempArray && tempArray.length > 0) {
      if (tempArray[0].sub_categories?.length > 0)
        tempArray[0].sub_categories?.map((items: any) => {
          subCategoryArray.push(items);
        });
    }

    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            {sub_categories[0] > 0 ? (
              <Popover.Button
                className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
               ${
                 open
                   ? "!border-primary-500 "
                   : "border-neutral-300 dark:border-neutral-700"
               }
                ${
                  !!categoriesState.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 17H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">Sub Categories</span>
                {!categoriesState.length ? (
                  <ChevronDownIcon className="w-4 h-4 ml-3" />
                ) : (
                  <span
                    onClick={() => {
                      setCategoriesState([]);
                      setSearchFilters({
                        minPrice: rangePrices[0],
                        maxPrice: rangePrices[1],
                        isOnSale: isOnSale,
                        sub_category_data: [],
                        sortOrder: "NONE",
                        category: activeCategory,
                      });
                    }}
                  >
                    {renderXClear()}
                  </span>
                )}
              </Popover.Button>
            ) : (
              ""
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {/* <Checkbox
                      name="Others"
                      label="Others"
                      defaultChecked={categoriesState.includes("Others")}
                      onChange={(checked) =>
                        handleChangeCategories(checked, "Others")
                      }
                    />
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" /> */}

                    {subCategoryArray.length > 0 &&
                      subCategoryArray.map((item: any) => (
                        <div key={item} className="">
                          <Checkbox
                            name={item}
                            label={item}
                            defaultChecked={categoriesState.includes(item)}
                            onChange={(checked) =>
                              handleChangeCategories(checked, item)
                            }
                          />
                        </div>
                      ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setSearchFilters({
                          minPrice: rangePrices[0],
                          maxPrice: rangePrices[1],
                          isOnSale: isOnSale,
                          sub_category_data: [],
                          sortOrder:
                            sortOrderStates !== "" ? sortOrderStates : "NONE",
                          category: activeCategory,
                        });
                        setCategoriesState([]);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        setSearchFilters({
                          minPrice: rangePrices[0],
                          maxPrice: rangePrices[1],
                          isOnSale: isOnSale,
                          sub_category_data: categoriesState,
                          sortOrder:
                            sortOrderStates !== "" ? sortOrderStates : "NONE",
                          category: activeCategory,
                        });

                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
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
                `}
            >
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
                {sortOrderStates
                  ? DATA_sortOrderRadios.filter(
                      (i) => i?.id === sortOrderStates
                    )[0]?.name
                  : "Sort order"}
              </span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span
                  onClick={() => {
                    setSortOrderStates("");
                    setSearchFilters({
                      minPrice: rangePrices[0],
                      maxPrice: rangePrices[1],
                      isOnSale: isOnSale,
                      sub_category_data: categoriesState,
                      sortOrder: "NONE",
                      category: activeCategory,
                    });
                  }}
                >
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
              leaveTo="opacity-0 translate-y-1"
            >
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
                        onChange={setSortOrderStates}
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setSearchFilters({
                          minPrice: rangePrices[0],
                          maxPrice: rangePrices[1],
                          isOnSale: isOnSale,
                          sub_category_data: categoriesState,
                          sortOrder: "NONE",
                          category: activeCategory,
                        });
                        setSortOrderStates("");
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        setSearchFilters({
                          minPrice: rangePrices[0],
                          maxPrice: rangePrices[1],
                          isOnSale: isOnSale,
                          sub_category_data: categoriesState,
                          sortOrder:
                            sortOrderStates !== "" ? sortOrderStates : "NONE",
                          category: activeCategory,
                        });

                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
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

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2 min-w-[90px]">{`${rangePrices[0]}$ - ${rangePrices[1]}$`}</span>
              {rangePrices[0] === PRICE_RANGE[0] &&
              rangePrices[1] === PRICE_RANGE[1] ? null : (
                <span
                  onClick={() => {
                    setRangePrices(PRICE_RANGE);
                    ApiCallPriceClearCross();
                  }}
                >
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price range</span>
                      <Slider
                        range
                        min={PRICE_RANGE[0]}
                        max={PRICE_RANGE[1]}
                        step={1}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onAfterChange={(_input: number | number[]) => {
                          setRangePrices(_input as number[]);
                        }}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                            value={rangePrices[0]}
                            onChange={(event) =>
                              setRangePrices([
                                Number(event.target.value),
                                rangePrices[1],
                              ])
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            name="maxPrice"
                            id="maxPrice"
                            className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                            value={rangePrices[1]}
                            onChange={(event) =>
                              setRangePrices([
                                rangePrices[0],
                                Number(event.target.value),
                              ])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        ApiCallPriceClear();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        if (rangePrices[1] === 0) {
                          toast.error("Maximum price can't be zero");
                        } else if (rangePrices[1] < rangePrices[0]) {
                          toast.error(
                            "Maximum price can't be less then minimum price"
                          );
                        } else if (rangePrices[0] > rangePrices[1]) {
                          toast.error(
                            "Minimum price can't be greater then maximum price"
                          );
                        } else {
                          setSearchFilters({
                            minPrice: rangePrices[0],
                            maxPrice: rangePrices[1],
                            isOnSale: isOnSale,
                            sub_category_data: categoriesState,
                            sortOrder:
                              sortOrderStates !== "" ? sortOrderStates : "NONE",
                            category: activeCategory,
                          });
                          close();
                        }
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
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

  // OK
  const renderTabIsOnsale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${
          isOnSale
            ? "border-primary-500 bg-primary-50 text-primary-900"
            : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
        }`}
        onClick={() => setIsIsOnSale(!isOnSale)}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 15L15 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.4945 14.5H14.5035"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.49451 9.5H9.50349"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="line-clamp-1 ml-2">On sale</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  // OK
  const renderMoreFilterItem = (
    data: {
      category: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    let tempArray: any = categories.filter(
      (fl: any) => fl.category === activeCategory
    );

    let subCategoryArray: any = [];
    let gg = [...categoriesState];

    if (tempArray && tempArray.length > 0) {
      if (tempArray[0].sub_categories?.length > 0)
        tempArray[0].sub_categories?.map((items: any) => {
          subCategoryArray.push(items);
        });
      // setSubCategoryArray(subCategoryArray)
    }

    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {subCategoryArray.map((item: any) => (
            <Checkbox
              key={item}
              name={item}
              label={item}
              defaultChecked={gg.includes(item)}
              onChange={(checked) => handleChangeCategories(checked, item)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {/* {list2.map((item) => (
            <Checkbox
              key={item.category}
              name={item.category}
              subLabel={item.description}
              label={item.category}
              defaultChecked={!!item.defaultChecked}
            />
          ))} */}
        </div>
      </div>
    );
  };

  const [selectedCategoryResponsive, setSelectedCategoryResponsive] =
    useState<any>();

  // OK
  const renderMoreFilterItemResponsive = (
    data: {
      category: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    let tempArray: any = categories.filter(
      (fl: any) => fl.category === activeCategory
    );

    let subCategoryArray: any = [];

    if (tempArray && tempArray.length > 0) {
      if (tempArray[0].sub_categories?.length > 0)
        tempArray[0].sub_categories?.map((items: any) => {
          subCategoryArray.push(items);
        });
      // setSubCategoryArray(subCategoryArray)
    }

    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {subCategoryArray.map((item: any) => (
            <Checkbox
              key={item}
              name={item}
              subLabel={item}
              label={item}
              defaultChecked={!!item.defaultChecked}
              onChange={(checked: any) => {
                setSelectedCategoryResponsive({
                  checked: checked,
                  item: item,
                });
              }}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {/* {list2.map((item) => (
            <Checkbox
              key={item.category}
              name={item.category}
              subLabel={item.description}
              label={item.category}
              defaultChecked={!!item.defaultChecked}
            />
          ))} */}
        </div>
      </div>
    );
  };

  const [isOnSaleRes, setIsIsOnSaleRes] = useState<boolean>(false);

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
          onClick={() => {
            openModalMoreFilter();
          }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 6.5H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 17.5H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 17.5H2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="ml-2">Product filters</span>
          <div
            onClick={() => {
              setRangePrices(PRICE_RANGE);
              setCategoriesState([]);
              setSelectedCategoryResponsive("");
              setSortOrderStates("");
              setIsIsOnSaleRes(false);

              setSearchFilters({
                minPrice: 0,
                maxPrice: 50000,
                isOnSale: false,
                sub_category_data: [],
                sortOrder: "",
                category: "",
              });
            }}
          >
            {renderXClear()}
          </div>
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Product filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Sub Categories</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(categories)}
                        </div>
                      </div>
                      <div className="relative flex flex-col py-8 space-y-5 pr-3">
                        <div className="py-7">
                          <h3 className="text-xl font-medium">Range Prices</h3>
                          <div className="mt-6 relative ">
                            <div className="relative flex flex-col space-y-8">
                              <div className="space-y-5">
                                <Slider
                                  range
                                  min={PRICE_RANGE[0]}
                                  max={PRICE_RANGE[1]}
                                  step={1}
                                  defaultValue={[
                                    rangePrices[0],
                                    rangePrices[1],
                                  ]}
                                  allowCross={false}
                                  onAfterChange={(_input: number | number[]) =>
                                    setRangePrices(_input as number[])
                                  }
                                />
                              </div>

                              <div className="flex justify-between space-x-3">
                                <div>
                                  <label
                                    htmlFor="minPrice"
                                    className="ml-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                  >
                                    Min price
                                  </label>

                                  <div className="mt-1 relative rounded-md">
                                    <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                      Rs
                                    </span>

                                    <input
                                      type="number"
                                      name="minPrice"
                                      id="minPrice"
                                      className="block w-28 pl-9  sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                      value={rangePrices[0]}
                                      onChange={(event) =>
                                        setRangePrices([
                                          Number(event.target.value),
                                          rangePrices[1],
                                        ])
                                      }
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label
                                    htmlFor="maxPrice"
                                    className="ml-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                  >
                                    Max price
                                  </label>
                                  <div className="mt-1 relative rounded-md mr-32">
                                    <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                      Rs
                                    </span>
                                    <input
                                      type="number"
                                      name="maxPrice"
                                      id="maxPrice"
                                      className="block w-28 pl-9  sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                      value={rangePrices[1]}
                                      onChange={(event) =>
                                        setRangePrices([
                                          rangePrices[0],
                                          Number(event.target.value),
                                        ])
                                      }
                                    />
                                  </div>
                                </div>

                                {/* <div>
                                  <div
                                    style={{
                                      marginLeft: "-7em",
                                      marginTop: "1.7rem",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        if (rangePrices[1] === 0) {
                                          toast.error(
                                            "Maximum price can't be zero"
                                          );
                                        } else if (
                                          rangePrices[1] < rangePrices[0]
                                        ) {
                                          toast.error(
                                            "Maximum price can't be less then minimum price"
                                          );
                                        } else if (
                                          rangePrices[0] > rangePrices[1]
                                        ) {
                                          toast.error(
                                            "Minimum price can't be greater then maximum price"
                                          );
                                        } else {
                                          ApiCallPrice();
                                          closeModalMoreFilter();
                                        }
                                      }}
                                      className="bg-gray-500 rounded-lg fill-red-500 hover:bg-gray-600 w-8 h-8"
                                    >
                                      <img
                                        src={play}
                                        // onClick={() => closeModalMoreFilter()}
                                        className="w-8 h-8"
                                        alt="play_button"
                                      />
                                    </button>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* --trending sort filter modal-- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Sort Order</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-5">
                            {DATA_sortOrderRadios.map((item) => (
                              <Radio
                                id={item.id}
                                key={item.id}
                                name="radioNameSort"
                                label={item.name}
                                defaultChecked={sortOrderStates === item.id}
                                onChange={setSortOrderStates}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* --trending filter modal-- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">On sale!</h3>
                        <div className="mt-6 relative ">
                          <MySwitch
                            label="On sale!"
                            desc="Products currently on sale"
                            enabled={isOnSaleRes}
                            onChange={setIsIsOnSaleRes}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices(PRICE_RANGE);
                        setCategoriesState([]);
                        setSelectedCategoryResponsive("");
                        setSortOrderStates("");
                        setIsIsOnSaleRes(false);

                        setSearchFilters({
                          minPrice: 0,
                          maxPrice: 50000,
                          isOnSale: false,
                          sub_category_data: [],
                          sortOrder: "",
                          category: "",
                        });

                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        handleChangeCategories(
                          selectedCategoryResponsive?.checked,
                          selectedCategoryResponsive?.item
                        );
                        setSearchFilters({
                          minPrice: rangePrices[0],
                          maxPrice: rangePrices[1],
                          isOnSale: isOnSaleRes,
                          sub_category_data: categoriesState,
                          sortOrder:
                            sortOrderStates !== "" ? sortOrderStates : "NONE",
                          category: activeCategory,
                        });
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      <span onClick={() => closeModalMoreFilter()}>Apply</span>
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 space-x-4">
        {renderTabIsOnsale()}

        {renderTabsCategories()}
        {renderTabsPriceRage()}

        <div className="!ml-auto">{renderTabsSortOrder()}</div>
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
};

export default TabFilters;
