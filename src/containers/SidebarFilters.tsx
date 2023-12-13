import React from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "shared/Radio/Radio";
import MySwitch from "components/MySwitch";
import toast from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "MOST_POPULAR" },
  { name: "Best Rating", id: "BEST_RATING" },
  { name: "Newest", id: "NEWEST" },
  { name: "Price Low - High", id: "PRICE_AESC" },
  { name: "Price High - Low", id: "PRICE_DESC" },
  { name: "None", id: "NONE" },
];
interface ProductAttribute {
  attribute_options?: any;
  name?: any;
  value?: any;
  setSideBarFilters: (value: any) => void;
  sideBarFilters?: any;
  ApiCall?: any;
  handleRadioSorting?: any;
  enableSort?: boolean;
}

const SidebarFilters: React.FC<ProductAttribute> = ({
  ApiCall,
  sideBarFilters,
  setSideBarFilters,
  enableSort,
}) => {
  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSideBarFilters({
        min: Number(value[0]),
        max: Number(value[1]),
      });
    }
  };

  // setting minimum and maximum prices for price slider End

  // onsale Items Swtich Starts
  const handleIsOnSaleChange = (event: boolean) => {
    const isChecked = event;
    setSideBarFilters({
      onSale: isChecked,
    });
  };

  const handleRadioSorting = (e: any) => {
    const isRadio = e;
    setSideBarFilters({
      sortOrder: isRadio,
    });
  };

  // onsale Items Swtich Ends

  // checkboxes starts here
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
  // checkboxes ends here

  const checkDefaultValue = (subcategory: string) => {
    return sideBarFilters.selectedSubCategories.includes(subcategory);
  };

  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4 pt-4">
        <h3 className="font-semibold mb-2.5">
          {sideBarFilters?.subCategories?.length > 0 ? "Sub Categories" : ""}
        </h3>

        {sideBarFilters?.subCategories?.map((subcategory: any) => (
          <div key={subcategory} className="pl-3">
            <Checkbox
              name={subcategory}
              label={subcategory}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              defaultChecked={checkDefaultValue(subcategory)}
              onChange={(checked: any) =>
                handleChangeCategories(checked, subcategory)
              }
            />
          </div>
        ))}
      </div>
    );
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

  const checkDefaultRadioValue = (subcategory: string) => {
    return sideBarFilters.sortOrder === subcategory ? true : false;
  };

  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold">Sort order</h3>
        {DATA_sortOrderRadios.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            sizeClassName="w-5 h-5"
            onChange={handleRadioSorting}
            defaultChecked={checkDefaultRadioValue(item.id)}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
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
                className="block w-28 pl-9  sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
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
                className="block w-28 pl-9  sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
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
                  toast.error("Maximum price can't be zero");
                } else if (sideBarFilters.max < sideBarFilters.min) {
                  toast.error("Maximum price can't be less then minimum price");
                } else if (sideBarFilters.min > sideBarFilters.max) {
                  toast.error(
                    "Minimum price can't be greater then maximum price"
                  );
                } else {
                  ApiCall();
                }
              }}
              className="bg-gray-500 rounded-lg fill-red-500 hover:bg-gray-600 w-8 h-8 flex justify-center items-center"
            >
              <BiSearchAlt width={50} color="white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {sideBarFilters?.subCategories?.length > 0 ? (
        <>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            <div style={{ marginBottom: "1rem" }} className="pr-2">
              <MySwitch
                label="On sale!"
                desc="Products currently on sale"
                enabled={sideBarFilters.onSale}
                onChange={handleIsOnSaleChange}
              />
            </div>
            {renderTabsPriceRage()}
            {renderTabsCategories()}
            {enableSort === true && renderTabsSortOrder()}
          </div>
        </>
      ) : (
        <>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            <div style={{ marginBottom: "1rem" }} className="pr-2">
              <MySwitch
                label="On sale!"
                desc="Products currently on sale"
                enabled={sideBarFilters.onSale}
                onChange={handleIsOnSaleChange}
              />
            </div>
            {renderTabsPriceRage()}
            {enableSort === true && renderTabsSortOrder()}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarFilters;
