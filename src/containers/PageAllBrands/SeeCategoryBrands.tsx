import React, { useEffect, useState } from "react";
import { SPORT_PRODUCTS } from "data/data";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { useParams } from "react-router-dom";
import SeeAllCategoryBrands from "./components/SeeAllCategoryBrands";
import { searchAllBrands } from "redux/Brand/searchBrands";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const SeeCategoryBrands = () => {
  const loginToken = useSelector((state: any) => state?.token?.loginToken);
  const searchBrands = useSelector(
    (state: any) => state?.SearchAllBrands?.brandsData
  );
  const searchBrandsLoading = useSelector(
    (state: any) => state?.SearchAllBrands?.searchBrandsIsLoading
  );
  const dispatch = useDispatch();
  const { name } = useParams<{ name?: string | any }>();
  const [tabActive, setTabActive] = React.useState("");
  const [searchValue, setSearchValue] = useState<any>();

  useEffect(() => {
    // console.log("BRANDS IS LOADING:", searchBrandsLoading);
    if (loginToken) {
      dispatch(
        searchAllBrands({
          loginToken: loginToken,
          business_name: "",
          category: atob(name),
          sub_category: tabActive != "" ? tabActive : "",
        })
      );

      // console.log("SEARCH ALL BRANDS:", searchBrands);
      // console.log("BRANDS IS LOADING:", searchBrandsLoading);
      // console.log("BRAND NAME: ", atob(name));
    }
  }, [tabActive]);

  useEffect(() => {
    if (searchValue === "") {
      if (loginToken) {
        dispatch(
          searchAllBrands({
            loginToken: loginToken,
            business_name: searchValue,
            category: atob(name),
            sub_category: tabActive != "" ? tabActive : "",
          })
        );
      }
    }
  }, [searchValue]);

  const search = () => {
    if (searchValue.length >= 3) {
      if (loginToken) {
        dispatch(
          searchAllBrands({
            loginToken: loginToken,
            business_name: searchValue,
            category: atob(name),
            sub_category: tabActive != "" ? tabActive : "",
          })
        );
      }
    } else {
      toast.error("Enter minimum 3 values to search");
    }
  };

  const toTitleCase = (str: any) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match: any) {
      return match.toUpperCase();
    });
  };

  return (
    <div>
      <>
        <div
          style={{
            marginLeft: "6%",
            marginRight: "5%",
          }}
          className="mt-12 md:mt-9"
        >
          <SeeAllCategoryBrands
            data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
            productData={
              searchBrands?.all_brands !== undefined &&
              searchBrands?.all_brands[atob(name)]
            }
            subHeading=""
            brandIndex={0}
            heading={atob(name)}
            sub_categories={searchBrands?.sub_categories}
            tabActive={tabActive}
            setTabActive={setTabActive}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            search={search}
          />
        </div>
      </>
    </div>
  );
};
export default SeeCategoryBrands;
