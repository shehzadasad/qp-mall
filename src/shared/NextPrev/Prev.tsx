import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { useMediaQuery } from "react-responsive";

export interface PrevProps {
  btnClassName?: string;
  className?: string;
  svgSize?: string;
  onClickPrev?: () => void;
}

const Prev: FC<PrevProps> = ({
  className = "relative",
  onClickPrev = () => {},
  btnClassName = "w-10 h-10",
  svgSize = "w-5 h-5",
}) => {
  const isMobile = useMediaQuery({ query: "(min-width: 480px)" });
  return (
    <div
      className={`nc-Prev text-slate-500 dark:text-slate-400 ${className}`}
      data-glide-el="controls"
      style={{
        top: `${!isMobile && "42%"}`,
        left: `${!isMobile && "7%"}`,
      }}
    >
      <button
        className={`${btnClassName} rounded-full flex items-center justify-center border-2 hover:border-slate-200 dark:hover:border-slate-600 border-transparent `}
        onClick={onClickPrev}
        title="Prev"
        data-glide-dir="<"
        style={{
          border: "1px solid white",
        }}
      >
        <svg className={svgSize} viewBox="0 0 24 24" fill="none">
          <path
            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 12H3.67004"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Prev;
