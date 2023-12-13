import { StarIcon } from "@heroicons/react/24/solid";
import FiveStartIconForRate from "components/FiveStartIconForRate";
import Prices from "components/Prices";
import SortOrderFilter from "components/SectionGridMoreExplore/SortOrderFilter";
import TabFilters from "components/TabFilters";
import React from "react";
import Avatar from "shared/Avatar/Avatar";
import SocialsList from "shared/SocialsList/SocialsList";
import "../PageSpecificBrand.css";
import { SearchBar } from "./SearchBar";
import TabFiltersIcon from "./TabFiltersIcon";

export const BrandProfileHeader = (props?: any) => {
  const RenderStarIcons = ({ star }: { star: number }) => {
    const listItems = [];

    for (let index = 0; index < 5; index++) {
      if (index < star) {
        listItems.push(
          <StarIcon className="w-4 h-5 pb-[1px] text-yellow-400" />
        );
      } else {
        listItems.push(
          <StarIcon className="w-4 h-5 pb-[1px] text-slate-300" />
        );
      }
    }

    return <> {listItems} </>;
  };

  return (
    <>
      <div className="specifcBrandHeaderMain">
        {/* <div id="brand-promotional-banner"></div>

        <div id="brand-details" className="flex w-100">
          <div id="brand-logo" className="w-30"></div>
          <div id="brand-name-and-Deatil-div" className="w-50">
            <div id="brand-name">Monark</div>
            <div id="brand-detail">Men’s Fashion & Clothes</div>
          </div>
          <div id="brand-rewiew" className="w-20">
            Reviws
          </div>
        </div> */}
        <div
          id="brand-promotional-banner"
          className="h-48 md:h-56 lg:h-72"
        ></div>
        <div className=" brand-details flex  lg:mb-12 container flex-col items-top pt-3 lg:flex-row lg:justify-between">
          <div className="flex justify-between md:mb-8">
            <div className=" nc-PostMeta2 h-20  flex items-top flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <div
                style={{
                  background: `url("${props?.logo}") no-repeat center center`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  marginTop: "-40pt",
                }}
                className="w-30 shadow-md w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 shrink-0 grow-0 rounded-full bg-green-300 text-green-700"
              >
                {/* <img src={props?.logo} alt="IMAGE" /> */}
              </div>
              <div className="ml-3">
                <div className="flex items-top">
                  <a className="block sm:hidden ml-3 text-xl md:text-2xl lg:text-3xl font-bold truncate">
                    {props?.brandName?.business_name.slice(0, 16).toUpperCase()}
                    {props?.brandName?.business_name.length > 16 && "..."}
                  </a>
                  <a className="hidden sm:block ml-3 text-xl md:text-2xl lg:text-3xl font-bold truncate">
                    {props?.brandName?.business_name.toUpperCase()}
                  </a>
                  <div className=" ml-4 items-center text-xl px-2 hidden sm:flex">
                    <RenderStarIcons
                      star={Math.round(props?.brandName?.rating)}
                    />
                    <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                      {Math.round(props?.brandName?.rating)}
                    </span>
                  </div>
                </div>
                {/* <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300 md:text-sm">
                    Men’s Fashion & Clothes
                  </span>
                </div> */}
              </div>
            </div>
            <div
              style={{ marginLeft: "-100pt" }}
              className="mt-2 block sm:hidden"
            >
              <br />
              <div className="flex items-center mb-0.5">
                <RenderStarIcons star={Math.round(props?.brandName?.rating)} />
                <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                  {Math.round(props?.brandName?.rating)}
                </span>
              </div>
            </div>
          </div>
          <div className=" flex  lg:flex-row w-full justify-between lg:justify-end items-top sm:items-top mt-3 sm:mt-1.5 sm:ml-3 lg:h-16">
            {/* <div className="px-2 sm:items-top flex  flex-row-reverse ">
              <div className="block lg:hidden flex items-center">
                <TabFiltersIcon />
              </div>
            </div> */}
            {/* <div className="px-1  flex items-center">
              <SortOrderFilter />
            </div> */}

            {/* <SocialsList /> */}
          </div>
        </div>
        <div id="product-part" className="grid grid-cols-2 gap-2">
          <div></div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </>
  );
};
