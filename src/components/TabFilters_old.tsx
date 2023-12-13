import { FC, Fragment, useState } from "react";
import play from "images/play.svg";
import { BiSearchAlt } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "shared/Radio/Radio";
import MySwitch from "components/MySwitch";
import toast from "react-hot-toast";

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "MOST_POPULAR" },
  { name: "Best Rating", id: "BEST_RATING" },
  { name: "Newest", id: "NEWEST" },
  { name: "Price Low - High", id: "PRICE_AESC" },
  { name: "Price High - Low", id: "PRICE_DESC" },
  { name: "None", id: "NONE" },
];
export interface TabFiltersProps {
  sideBarFilters?: any;
  setSideBarFilters?: any;
  ApiCall?: any;
}

const TabFilters_old: FC<TabFiltersProps> = ({
  sideBarFilters,
  setSideBarFilters,
  ApiCall,
}) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  const handleChangeCategories = (checked: boolean, name: string) => {
    if (checked === true) {
      setSideBarFilters({
        selectedSubCategories: [...sideBarFilters.selectedSubCategories, name],
      });
    } else if (checked === false) {
      setSideBarFilters({
        selectedSubCategories: sideBarFilters.selectedSubCategories.filter(
          (i: any) => i !== name
        ),
      });
    }
  };

  const checkDefaultValue = (subcategory: string) => {
    return sideBarFilters.selectedSubCategories.includes(subcategory);
  };

  const checkDefaultRadioValue = (subcategory: string) => {
    return sideBarFilters.sortOrder === subcategory ? true : false;
  };

  const renderMoreFilterItem = () => {
    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {sideBarFilters?.subCategories?.map((subcategory: any) => (
            <div key={subcategory} className="pl-3">
              <Checkbox
                name={subcategory}
                label={subcategory}
                sizeClassName="w-5 h-5"
                labelClassName="text-sm font-normal"
                defaultChecked={checkDefaultValue(subcategory)}
                onChange={(checked: any) => (
                  handleChangeCategories(checked, subcategory),
                  closeModalMoreFilter()
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSideBarFilters({
        min: Number(value[0]),
        max: Number(value[1]),
      });
    }
  };

  const handleIsOnSaleChange = (event: boolean) => {
    const isChecked = event;
    setSideBarFilters({
      onSale: isChecked,
    });

    closeModalMoreFilter();
  };

  const handleRadioSorting = (e: any) => {
    setSideBarFilters({
      sortOrder: e,
    });

    closeModalMoreFilter();
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0 w-full">
        <div
          className={`flex flex-shrink-0 items-center w-full justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
          onClick={openModalMoreFilter}
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

          <span className="ml-2">Choose filters</span>
          {/* {renderXClear()} */}
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
                      {/* -- on Sale -- */}
                      <div className="py-7">
                        <div className="mt-6 relative ">
                          <MySwitch
                            label="On sale!"
                            desc="Products currently on sale"
                            enabled={sideBarFilters.onSale}
                            onChange={handleIsOnSaleChange}
                          />
                        </div>
                      </div>

                      {/* --------- */}
                      {/* --Price Range-- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                min={0}
                                max={99999}
                                step={1}
                                defaultValue={[0, 99999]}
                                allowCross={false}
                                onAfterChange={handlePriceRangeChange}
                              />
                            </div>

                            <div className="flex flex-row space-x-3">
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
                                    className="block w-28 pl-9 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                    value={sideBarFilters.min}
                                    onChange={(event: any) =>
                                      setSideBarFilters({
                                        min: Number(event.target.value),
                                      })
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
                                    className="block w-28 pl-9 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                    value={sideBarFilters.max}
                                    onChange={(event: any) =>
                                      setSideBarFilters({
                                        max: Number(event.target.value),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  marginLeft: "-7em",
                                  marginTop: "1.7rem",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (sideBarFilters.max === 0) {
                                      toast.error(
                                        "Maximum price can't be zero"
                                      );
                                    } else if (
                                      sideBarFilters.max < sideBarFilters.min
                                    ) {
                                      toast.error(
                                        "Maximum price can't be less then minimum price"
                                      );
                                    } else if (
                                      sideBarFilters.min > sideBarFilters.max
                                    ) {
                                      toast.error(
                                        "Minimum price can't be greater then maximum price"
                                      );
                                    } else {
                                      ApiCall();
                                      closeModalMoreFilter();
                                    }
                                  }}
                                  className="bg-gray-500 rounded-lg fill-red-500 hover:bg-gray-600 w-8 h-8"
                                >
                                  <BiSearchAlt width={50} color="white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* -- Sub Categories-- */}
                      {sideBarFilters?.subCategories?.length > 0 && (
                        <div className="py-7">
                          <h3 className="text-xl font-medium">
                            Sub Categories
                          </h3>
                          <div className="mt-6 relative ">
                            {renderMoreFilterItem()}
                          </div>
                        </div>
                      )}

                      {/* --------- */}
                      {/* --sort filter modal-- */}
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
                                sizeClassName="w-5 h-5"
                                defaultChecked={checkDefaultRadioValue(item.id)}
                                onChange={handleRadioSorting}
                                className="!text-sm"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
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
      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4 w-full">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
};

export default TabFilters_old;
