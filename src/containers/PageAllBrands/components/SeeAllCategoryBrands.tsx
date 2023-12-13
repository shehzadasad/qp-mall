import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import "../PageAllBrands.css";
import monark from "../../../images/monark.png";
import ProductCard from "../../../components/ProductCard";
import { Product, PRODUCTS } from "data/data";
import noproduct from "images/collections/noproduct.png";
import { StarIcon } from "@heroicons/react/24/solid";
import HeaderFilterSection from "components/HeaderFilterSection";
import SubCategoriesFilter from "./SubCategoriesFilter";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { useHistory } from "react-router";

export interface AllBrandsProductsProps {
  className?: string;
  itemClassName?: string;
  heading?: any;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  productData?: any;
  brandIndex?: number;
  sub_categories?: any;
  tabActive?: any;
  setTabActive?: any;
  fetchSearchData?: any;
  searchValue?: any;
  setSearchValue?: any;
  search?: any;
}

const SeeAllCategoryBrands: FC<AllBrandsProductsProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  productData = [],
  brandIndex = 0,
  sub_categories = [],
  setTabActive,
  tabActive = "",
  fetchSearchData,
  searchValue = "",
  setSearchValue,
  search,
}) => {
  const id = useId();

  useEffect(() => {
    // console.log("BRANDS DATA: ", productData);
  }, []);

  const searchBrandsLoading = useSelector(
    (state: any) => state?.SearchAllBrands?.searchBrandsIsLoading
  );

  const history = useHistory();

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
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className={`flow-root`}>
        <div
          // style={{ border: "2px solid blue" }}
          className="grid md:flex place-content-center md:place-content-start"
        >
          <div
            // style={{ border: "2px solid red" }}
            className="grid w-full md:flex grid-cols-1 text-center md:text-left"
          >
            <Heading
              b64CategoryName={btoa(heading)}
              className={"mt-2 mb-2 p-2"}
              fontClass={"text-3xl md:text-3xl font-semibold font-semibold"}
              rightDescText={subHeading}
            >
              {heading.toUpperCase()}
            </Heading>
          </div>
          <div
            // style={{ border: "2px solid yellow" }}
            className="flex justify-center md:justify-end"
          >
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  search();
                }}
                className="p-2.5 ml-2 text-sm font-medium text-white bg-black rounded-lg border border-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black-300 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
        <div style={{ marginTop: "15pt" }}>
          <SubCategoriesFilter
            tabActive={tabActive}
            setTabActive={setTabActive}
            sub_categories={sub_categories}
          />
        </div>
        {!searchBrandsLoading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {productData &&
                productData?.map((item: any) => {
                  return (
                    <>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/brand/${btoa(item?.user_id)}`);
                        }}
                        className="p-3 card-wrapper"
                      >
                        <div className="main-card items-center justify-center flex p-1">
                          <img
                            style={{ height: "100%" }}
                            src={item?.logo_path}
                            alt="image"
                          />
                        </div>
                        <div className="inner-circle flex items-center justify-center shadow shadow-lg">
                          <img
                            src={item?.logo_path}
                            alt="image"
                            style={{ objectFit: "contain", height: "100%" }}
                          />
                        </div>
                        <div className="logo-section">
                          <p
                            style={{ width: "100pt" }}
                            className="font-bold truncate"
                          >
                            {item?.business_name}
                          </p>
                          <div
                            id="star-icon"
                            style={{ width: "100pt" }}
                            className="flex"
                          >
                            <RenderStarIcons star={Math.round(item.rating)} />
                            <p style={{ marginLeft: "5%" }}>
                              {Math.round(item.rating)}
                            </p>
                          </div>
                        </div>
                        <div className="logo-section-res">
                          <p className="font-bold truncate">
                            {item?.business_name}
                          </p>
                          <div id="star-icon-res" className="flex">
                            <RenderStarIcons star={Math.round(item.rating)} />
                            <p style={{ marginLeft: "5%" }}>
                              {Math.round(item.rating)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="flex justify-center mb-40 mt-20">
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
        )}
        {productData.length === 0 && !searchBrandsLoading && (
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
                  No Brands Found
                </p>
              </center>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeeAllCategoryBrands;
