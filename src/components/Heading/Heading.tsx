import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "shared/NextPrev/NextPrev";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  rightDescText?: ReactNode;
  rightPopoverOptions?: typeof solutions;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
  FlashSales?: boolean;
  b64CategoryName?: any;
  showSeeAll?: boolean;
  route?: any;
  seeAllUrl?: string;
}

const solutions = [
  {
    name: "last 24 hours",
    href: "##",
  },
  {
    name: "last 7 days",
    href: "##",
  },
  {
    name: "last 30 days",
    href: "##",
  },
];

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "",
  className = "mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  fontClass = "text-3xl md:text-4xl font-semibold sm:text-2xl font-semibold",
  rightDescText,
  rightPopoverOptions = solutions,
  FlashSales = false,
  b64CategoryName = "",
  showSeeAll = false,
  route = "",
  seeAllUrl,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col justify-between ${className}`}>
      <div
        className={
          isCenter
            ? "flex flex-col items-center text-center w-full mx-auto"
            : ""
        }>
        <h2
          className={`heading ${isCenter ? "justify-center" : ""} ${fontClass}`}
          {...args}>
          {children || ``}
          {rightDescText && (
            <>
              <span className="text-neutral-500 dark:text-neutral-400">
                {rightDescText}
              </span>
            </>
          )}
        </h2>
        {!!desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>

      {FlashSales === true && (
        <div className="flex align-center justify-between">
          <div className="flex">
            <div className="text-lg font-semibold flex items-center">
              Flash Sales
            </div>

            <div
              className="flex ml-3 items-center"
              style={{
                borderTop: "1px solid grey",
                borderBottom: "1px solid grey",
              }}>
              <div
                style={{
                  fontSize: "7pt",
                  fontWeight: "lighter",
                  marginRight: "2pt",
                }}>
                Ending in{" "}
              </div>
              <div
                className="w-6 flex justify-center items-center ml-0.5 text-white text-xs"
                style={{
                  fontSize: "8pt",
                  fontWeight: "lighter",
                  backgroundColor: "#FD6921",
                }}>
                24
              </div>
              <div className="text-amber-600 w-1 ml-0.5 text-xs">:</div>

              <div
                className="w-6 flex justify-center items-center text-white ml-0.5 text-xs"
                style={{
                  fontSize: "8pt",
                  fontWeight: "lighter",
                  backgroundColor: "#FD6921",
                }}>
                24
              </div>
              <div className="text-amber-600 w-1 ml-0.5 text-xs">:</div>

              <div
                className="w-6 flex justify-center items-center text-white ml-0.5 text-xs"
                style={{
                  fontSize: "8pt",
                  fontWeight: "lighter",
                  backgroundColor: "#FD6921",
                }}>
                24
              </div>
            </div>
          </div>
          <div className="">
            {hasNextPrev && !isCenter && (
              <div className="sm:ml-2 sm:mt-0 flex-shrink-0">
                <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
              </div>
            )}
          </div>
        </div>
      )}

      {FlashSales === false && hasNextPrev && !isCenter && (
        <div className="flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <NextPrev
            b64CategoryName={b64CategoryName}
            onClickNext={() => {}}
            onClickPrev={() => {}}
            showSeeAll={showSeeAll}
            seeAllUrl={seeAllUrl}
            route={route}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
