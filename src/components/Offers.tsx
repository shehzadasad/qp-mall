import React, { useEffect, useId, FC } from "react";
import img1 from "images/collections/1.png";
import img2 from "images/collections/5.png";
import img3 from "images/collections/4.png";
import img4 from "images/collections/3.png";
import { v4 as uuidv4 } from "uuid";
import CardCategory3, {
  CardCategory3Props,
} from "./CardCategories/CardCategory3";
import Glide from "@glidejs/glide";
import "../App.css";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: "Explore new arrivals",
    desc: "Shop the latest <br /> from top brands",
    featuredImage: img1,
    color: "bg-yellow-50",
  },
  {
    name: "Digital gift cards",
    desc: "Give the gift <br /> of choice",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "Sale collection",
    desc: "Up to <br /> 80% off retail",
    featuredImage: img3,
    color: "bg-blue-50",
  },
];

export interface OfferProps {
  className?: string;
  featuredImage?: string;
  name?: string;
  desc?: string;
  color?: string;
}
const Offers: FC<OfferProps> = ({
  className = "",
  featuredImage = CATS_DISCOVER[2].featuredImage,
  name = CATS_DISCOVER[2].name,
  desc = CATS_DISCOVER[2].desc,
  color = CATS_DISCOVER[2].color,
}) => {
  const id = useId();

  return (
    <>
      <div
        className="offers"
        style={{
          marginTop: "4rem",
          alignContent: "center",
          width: "33%",
        }}
      >
        <div className="grid grid-cols-3 gap-[27rem] mt-2.5 ">
          {CATS_DISCOVER.map((item, index) => (
            <div
            key={uuidv4()}
            className="w-[18rem] lg:w-[25rem]"
              // style={{
              //   width: "25rem",
              // }}
            >
              <div>
                <Link
                  to={"/"}
                  className={`nc-CardCategory3 block ${className}`}
                  data-nc-id="CardCategory3"
                >
                  <div
                    // style={{ backgroundColor: "aqua", width: "30%", height: "10rem" }}
                    className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${item.color}`}
                  >
                    <div>
                      <NcImage
                        src={item.featuredImage}
                        containerClassName="absolute inset-5 sm:inset-8"
                        className="absolute right-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                      />
                    </div>
                    <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

                    <div>
                      <div className="absolute inset-5 sm:inset-8 flex flex-col">
                        <div className="max-w-xs">
                          <span className={`block mb-2 text-sm text-slate-700`}>
                            {item.name}
                          </span>
                          {item.desc && (
                            <h2
                              className={`text-xl md:text-1xl text-slate-900 font-semibold`}
                              dangerouslySetInnerHTML={{ __html: item.desc }}
                            ></h2>
                          )}
                        </div>
                        <div className="mt-auto">
                          <ButtonSecondary
                            sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                            fontSize="text-sm font-medium"
                            className="nc-shadow-lg"
                          >
                            Show me all
                          </ButtonSecondary>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offers;
