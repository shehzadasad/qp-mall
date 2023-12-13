import { Transition } from "@headlessui/react";
import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import React, { FC } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import { useHistory } from "react-router-dom";

interface Props {
  show: boolean;
  productImage: string;
  variantActive: number;
  sizeSelected: string;
  quantitySelected: number;
  product?: any;
}

const NotifyAddTocart: FC<Props> = ({
  show,
  productImage,
  variantActive,
  quantitySelected,
  sizeSelected,
  product,
}) => {
  const { name, price, variants } = PRODUCTS[0];

  const history = useHistory();

  const getVariantPrice = (selectedVariant: any) => {
    let variantPrice = 0;
    let variantSalePrice = 0;
    product.product_variants.length > 0 &&
      product.product_variants.forEach((items: any, index2: number) => {
        if (_.isEqual(selectedVariant, items.variant_attributes)) {
          variantPrice = items.price;
          if (items.sale_price) variantSalePrice = items.sale_price;
        } else {
        }
      });

    if (variantSalePrice !== 0)
      return (
        <Prices
          price={variantPrice}
          salePrice={variantSalePrice}
          className="mt-0.5"
        />
      );
    else return <Prices price={variantPrice} className="mt-0.5" />;
  };

  const renderProductCartOnNotify = (product: any) => {
    let objectLength = Object.keys(product?.selectedVariant).length;
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.product_info.image}
            alt={"img"}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  {product.product_info.title}
                </h3>
              </div>
              <>
                {Object.keys(product.selectedVariant).length > 0 ? (
                  getVariantPrice(product.selectedVariant)
                ) : (
                  <Prices
                    price={product?.product_info?.price}
                    salePrice={product?.product_info?.sale_price}
                    className="mt-0.5"
                  />
                )}
              </>
            </div>

            <div className="flex justify-between items-end ">
              {objectLength > 0 ? (
                <p
                  className="text-sm text-slate-500 dark:text-slate-400"
                  style={{ display: "flex" }}
                >
                  {Object?.values(product.selectedVariant).map(
                    (value: any, index: number) => {
                      return (
                        <div>
                          {index !== 0 && (
                            <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                          )}

                          <span>{value}</span>
                        </div>
                      );
                    }
                  )}

                  <div className="ml-3 flex items-center mb-0.5">
                    <StarIcon className="w-4 h-4 pb-[1px] text-amber-400" />
                    <span
                      className="ml-1 text-slate-500 dark:text-slate-400"
                      style={{ fontSize: "10px" }}
                    >
                      {/* {product.average_rating} */}({product.num_of_reviews}{" "}
                      reviews)
                    </span>
                  </div>
                </p>
              ) : (
                <div className="flex items-center mb-0.5">
                  <StarIcon className="w-4 h-4 pb-[1px] text-amber-400" />
                  <span
                    className="ml-1 text-slate-500 dark:text-slate-400"
                    style={{ fontSize: "10px" }}
                  >
                    {/* {product.average_rating} */}({product.num_of_reviews}{" "}
                    reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">
              Qty {product.quantity}
            </p>

            <div className="flex">
              <a
                // type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                // onClick={(e) => {
                //   e.preventDefault();
                //   history.push("cart");
                // }}
                href="/cart"
              >
                View cart
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <p className="block text-base font-semibold leading-none">
        Added to cart!
      </p>
      <hr className=" border-slate-200 dark:border-slate-700 my-4" />
      {renderProductCartOnNotify(product)}
    </Transition>
  );
};

export default NotifyAddTocart;
