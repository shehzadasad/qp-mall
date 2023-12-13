import Heading2 from "components/Heading/Heading";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";

const FeaturedBrands = () => {
  const history = useHistory();
  const featuredBrandsData = useSelector(
    (state: any) => state.NavBar?.data?.data?.top_brands
  );

  return (
    <div>
      <p className="mb-6 text-2xl font-medium flex justify-center capitalize">
        Featured Brands
      </p>

      {/* <div className="grid grid-cols-2 text-center place-items-center md:grid-cols-6 gap-10"> */}
      <div className="md:flex md:justify-center gap-14 grid grid-cols-2 justify-items-center mt-10">
        {featuredBrandsData?.map((brand: any) => {
          return (
            <div
              key={uuidv4()}
              onClick={() => {
                history.push(`/brand/${btoa(brand.user_id)}`);
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  height: "70pt",
                  cursor: "pointer",
                }}
                alt="brand logos"
                className="shadow shadow-lg"
                src={brand?.logo_path}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <ButtonPrimary
          onClick={() => {
            history.push(`/brands`);
          }}
        >
          See All Brands
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default FeaturedBrands;
