import React, { FC } from "react";
var currencyFormatter = require("currency-formatter");

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
  quantity?: number;
  salePrice?: number;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price,
  quantity,
  salePrice = 0,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-xs font-normal",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span
          className={`text-green-500 !leading-none ${
            salePrice !== 0 && "line-through"
          }`}
        >
          {currencyFormatter.format(price, {
            code: "PKR",
            format: "%s %v",
            precision: 0,
          })}
        </span>
        {salePrice !== 0 && (
          <span className="ml-2 text-green-500 !leading-none">
            {currencyFormatter.format(salePrice, {
              code: "PKR",
              format: "%s %v",
              precision: 0,
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Prices;
