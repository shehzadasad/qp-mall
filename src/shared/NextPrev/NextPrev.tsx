import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../App.css";
import ButtonPrimary from "shared/Button/ButtonPrimary";
export interface NextPrevProps {
  className?: string;
  currentPage?: number;
  totalPage?: number;
  btnClassName?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onlyNext?: boolean;
  onlyPrev?: boolean;
  b64CategoryName?: any;
  showSeeAll?: boolean;
  route?: any;
  seeAllUrl?: string;
}

const NextPrev: FC<NextPrevProps> = ({
  className = "",
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = "w-8 h-8",
  onlyNext = false,
  onlyPrev = false,
  b64CategoryName = "",
  showSeeAll = false,
  route = "",
  seeAllUrl,
}) => {
  const [focus, setFocus] = React.useState<"left" | "right">("right");
  const history = useHistory();
  return (
    <div
      className={`nc-NextPrev relative flex items-center text-slate-500 dark:text-slate-400 ${className}`}
      data-nc-id="NextPrev"
      data-glide-el="controls">
      {showSeeAll === true && (
        <>
          {/* <button
            onClick={() => {
             
            }}
            className="see-all-btn py-1 px-4 rounded-full"
          >
            See All
          </button> */}
          <ButtonPrimary
            onClick={() => {
              history.push(
                seeAllUrl
                  ? `/product/${seeAllUrl}`
                  : `${route ? route : `/brands/${b64CategoryName}`}`
              );
            }}>
            See All
          </ButtonPrimary>
        </>
      )}
      {!onlyNext && (
        <button
          className={`${btnClassName} ${
            !onlyPrev ? "mr-2" : ""
          } border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center ${
            focus === "left" ? "border-2" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            onClickPrev();
          }}
          title="Prev"
          data-glide-dir="<"
          onMouseEnter={() => setFocus("left")}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 12H3.67004"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {!onlyPrev && (
        <button
          className={`${btnClassName}  border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center ${
            focus === "right" ? "border-2" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            onClickNext();
          }}
          title="Next"
          data-glide-dir=">"
          onMouseEnter={() => setFocus("right")}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 12H20.33"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NextPrev;
