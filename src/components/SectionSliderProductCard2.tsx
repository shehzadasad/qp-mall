import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "data/data";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  productData?: any[];
  flag?: boolean;
  showSeeAll?: boolean;
  seeAllUrl?: string;
}

const SectionSliderProductCard2: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  flag,
  subHeading,
  showSeeAll = false,
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  productData = [],
  seeAllUrl,
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
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
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

  return (
    <div className={`nc-SectionSliderProductCard ${className} `}>
      <div className={`${UNIQUE_CLASS} flow-root `} ref={sliderRef}>
        <Heading
          className={`mb-4 ${headingClassName}`}
          fontClass={`flex text-3xl font-semibold ${headingFontClassName}`}
          rightDescText={subHeading}
          hasNextPrev
          showSeeAll={showSeeAll}
          seeAllUrl={seeAllUrl}
          route={"/"}>
          {heading || `Heading`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {productData?.map((item, index) => (
              <li
                key={item.product_info.id}
                className={`glide__slide `}
                style={{
                  maxHeight: "100%",
                  maxWidth: "222pt",

                  // width: "276px",
                }}>
                {/* flash sale */}
                <ProductCard
                  likeItem={item.is_liked}
                  product={item}
                  heading={heading}
                  productData={item.product_info}
                  productVarients={
                    item?.product_variants?.length > 0
                      ? item?.variants_parent_child_relation
                      : []
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard2;
