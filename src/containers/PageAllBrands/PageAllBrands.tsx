import React, { useEffect, useState } from "react";
import { SPORT_PRODUCTS } from "data/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "redux/Brand/fetchAllBrands";
import "../../App.css";
import AllBrands from "./components/AllBrands";
import { ColorRing } from "react-loader-spinner";

const PageAllBrands = () => {
  const loginToken = useSelector((state: any) => state?.token?.loginToken);
  const allBrands = useSelector((state: any) => state?.AllBrands?.brands);
  const allBrandsLoading = useSelector(
    (state: any) => state?.AllBrands?.brandsIsLoading
  );
  const dispatch = useDispatch();
  const [brandsArray, setBrandsArray] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchAllBrands({ loginToken }));
  }, [loginToken]);

  useEffect(() => {
    // console.log("ALL BRANDS:", Object.keys(allBrands?.all_brands).length);
    if (
      allBrands?.all_brands !== undefined &&
      Object.keys(allBrands?.all_brands).length > 0
    ) {
      const dataArray: any = Object?.entries(allBrands?.all_brands).map(
        (key: any, value: any) => {
          return { data: key, ...value };
        }
      );
      setBrandsArray(dataArray);
    }
  }, [allBrands]);

  return (
    <>
      {allBrandsLoading ? (
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
      ) : (
        <div className="mb-12">
          {brandsArray?.map((items: any, index: number) => {
            return (
              <>
                <div
                  key={items?.data[0]}
                  style={{
                    marginLeft: "6%",
                    marginRight: "5%",
                  }}
                  className="mt-12 md:mt-9"
                >
                  <AllBrands
                    data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
                    productData={[items?.data[1]]}
                    subHeading=""
                    brandIndex={index}
                    heading={items?.data[0]}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};
export default PageAllBrands;
