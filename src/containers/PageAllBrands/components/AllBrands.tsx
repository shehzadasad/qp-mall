import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import "../PageAllBrands.css";
import monark from "../../../images/monark.png";
import ProductCard from "../../../components/ProductCard";
import { Product, PRODUCTS } from "data/data";

import { StarIcon } from "@heroicons/react/24/solid";
import { useHistory } from "react-router";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface AllBrandsProps {
  className?: string;
  itemClassName?: string;
  heading?: any;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  productData?: any;
  brandIndex?: number;
}

const AllBrands: FC<AllBrandsProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  productData = [],
  brandIndex = 0,
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return () => {};
    }

    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 3,
      gap: 10,
      bound: true,
      breakpoints: {
        1280: {
          perView: 3 - 1,
        },
        1024: {
          gap: 20,
          perView: 3 - 1,
        },
        768: {
          gap: 20,
          perView: 3 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [sliderRef, UNIQUE_CLASS]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
    <div className={`nc-SectionSliderProductCard ${className} `}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading
          b64CategoryName={btoa(heading)}
          className={"mb-7 ml-3"}
          fontClass={
            "text-3xl md:text-3xl font-semibold sm:text-2xl font-semibold"
          }
          rightDescText={subHeading}
          hasNextPrev
          showSeeAll={true}
        >
          {heading.toUpperCase()}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {productData &&
              productData[0]
                ?.filter((item: any, idx: number) => idx < 7)
                .map((items: any) => {
                  return (
                    <>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/brand/${btoa(items?.user_id)}`);
                        }}
                        className="p-3 card-wrapper"
                      >
                        <div className="main-card items-center justify-center flex p-1">
                          <img
                            style={{ height: "100%" }}
                            src={items?.logo_path}
                            alt="image"
                          />
                        </div>
                        <div className="inner-circle flex items-center justify-center shadow shadow-lg">
                          <img
                            src={items?.logo_path}
                            alt="image"
                            style={{ objectFit: "contain", height: "100%" }}
                          />
                        </div>
                        <div className="logo-section">
                          <p
                            style={{ width: "100pt", fontSize: "12pt" }}
                            className="font-bold truncate"
                          >
                            {items?.business_name?.toUpperCase()}
                          </p>
                          <div
                            style={{ width: "100pt" }}
                            id="star-icon"
                            className="flex"
                          >
                            <RenderStarIcons star={Math.round(items.rating)} />
                            <p style={{ marginLeft: "5%" }}>
                              {Math.round(items.rating)}
                            </p>
                          </div>
                        </div>
                        <div className="logo-section-res">
                          <p className="font-bold truncate">
                            {items?.business_name?.toUpperCase()}
                          </p>
                          <div id="star-icon-res" className="flex">
                            <RenderStarIcons star={Math.round(items.rating)} />
                            <p style={{ marginLeft: "5%" }}>
                              {Math.round(items.rating)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
          </ul>
        </div>
        <div className="flex md:hidden justify-center mt-5">
          <ButtonPrimary
            className="px-7"
            onClick={() => {
              history.push(`/brands/${btoa(heading)}`);
            }}
          >
            See All
          </ButtonPrimary>
          {/* <button
            onClick={() => {
             
            }}
            className="see-all-btn py-1 px-4 rounded-full mt-3 mb-4"
          >
            See All
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AllBrands;
