import { Popover, Transition } from "@headlessui/react";
import Prices from "components/Prices";
import { Fragment, useReducer } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Close from "../../images/close.svg";
import { storeCartProduct } from "redux/Product/storeProductDetail";
import { useHistory } from "react-router-dom";

var currencyFormatter = require("currency-formatter");

export default function CartDropdown() {
  const cartData = useSelector(
    (state: any) => state?.storeProductDetail?.productCartData
  );

  const [alertModal, setAlertModal] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      flag: false,
      index: 0,
    }
  );
  const [alertModalClear, setAlertModalClear] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      flag: false,
      index: 0,
    }
  );

  const dispatch = useDispatch();

  const handleRemove = (index: any) => {
    setAlertModal({
      flag: true,
      index: index,
    });
  };
  const handleRemoveCart = () => {
    setAlertModalClear({
      flag: true,
    });
  };
  const handleRemove2 = () => {
    let tempArray: any = [...cartData];
    tempArray.splice(alertModal.index, 1);
    dispatch(storeCartProduct(tempArray));
    setAlertModal({
      flag: false,
    });
  };
  const clearCart = () => {
    let tempArray: any = [];
    dispatch(storeCartProduct(tempArray));
    setAlertModalClear({
      flag: false,
    });
  };

  const getVariantPrice = (product: any, selectedVariant: any) => {
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

  const renderProduct = (item: any, index: number, close: () => void) => {
    let objectLength: any;
    if (item && item?.selectedVariant) {
      objectLength = Object.keys(item?.selectedVariant)?.length;
    }

    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={item.product_info.image}
            alt={"img"}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            to={"/product-detail"}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} to={"/product-detail"}>
                    {item?.product_info?.title}
                  </Link>
                </h3>
              </div>
              {item?.selectedVariant &&
              Object?.keys(item?.selectedVariant) !== undefined &&
              Object?.keys(item?.selectedVariant)?.length > 0 ? (
                getVariantPrice(item, item?.selectedVariant)
              ) : (
                <Prices
                  contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                  price={item?.product_info?.price}
                  salePrice={item?.product_info?.sale_price}
                />
              )}
            </div>

            <div className="flex justify-between items-end ">
              {objectLength > 0 ? (
                <p
                  className="text-sm text-slate-500 dark:text-slate-400"
                  style={{ display: "flex" }}
                >
                  {Object?.values(item.selectedVariant)?.map(
                    (value: any, index: number) => {
                      return (
                        <div key={index}>
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
                      {/* {item.average_rating} */}({item.num_of_reviews}{" "}
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
                    {/* {item.average_rating} */}({item.num_of_reviews} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty ${item.quantity}`}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getTotalprice = () => {
    let tempPrice = 0;
    cartData?.map((item: any) => {
      let price = item.product_info.price || 0;
      let salePrice = item.product_info.sale_price || 0;

      if (salePrice) {
        tempPrice += salePrice * item.quantity;
      } else {
        tempPrice += price * item.quantity;
      }
    });
    return tempPrice;
  };

  const history = useHistory();

  return (
    <div>
      <Popover className="relative" data-modal-target="staticModal">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                <span className="mt-[1px]">{cartData?.length}</span>
              </div>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Link className="block md:hidden absolute inset-0" to={"/cart"} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <div className="relative bg-white dark:bg-neutral-800">
                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                      <h3 className="text-xl font-semibold">Shopping cart</h3>
                      <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {cartData?.length === 0 && (
                          <div className="flex justify-center mt-6 mb-3">
                            Cart is empty!
                          </div>
                        )}
                        {cartData?.length > 0 &&
                          cartData?.map((item: any, index: any) =>
                            renderProduct(item, index, close)
                          )}
                      </div>
                    </div>

                    {cartData?.length > 0 && (
                      <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                        <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                          <span>
                            <span>Order Total</span>
                            <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal pr-4">
                              Shipping and taxes are going to be calculated at
                              checkout.
                            </span>
                          </span>

                          <span className="">
                            {currencyFormatter.format(getTotalprice(), {
                              code: "PKR",
                              format: "%s %v",
                              precision: 0,
                            })}
                          </span>
                        </p>
                        <div className="flex justify-center items-center mt-5">
                          <ButtonSecondary
                            className="flex-1 border border-slate-200 dark:border-slate-700"
                            onClick={() => {
                              history.push("/cart");
                            }}
                          >
                            View cart
                          </ButtonSecondary>
                          <ButtonPrimary
                            className="flex-1 border border-slate-200 dark:border-slate-700"
                            onClick={() => handleRemoveCart()}
                          >
                            Clear Cart
                          </ButtonPrimary>
                          {/* <ButtonPrimary 
                            href="/checkout"  
                            onClick={close}
                            className="flex-1"
                          > 
                            Buy Now
                          </ButtonPrimary> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      {alertModal.flag && (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-x-hidden overflow-y-auto z-40 top-0 left-0 w-full h-full outline-none">
          <div
            className="bg-white rounded-2xl md:w-[30%] w-[75%] text-center overflow-y-scroll p-[14px]"
            style={{ maxHeight: "90vh" }}
          >
            <div
              className="flex justify-end"
              onClick={() => setAlertModal({ flag: false })}
            >
              <img src={Close} alt="" style={{ cursor: "pointer" }} />
            </div>
            <div className="flex justify-center my-[14px]">
              Are you sure you want to remove this item?
            </div>
            <div className="flex justify-center mt-4 mb-2">
              <button
                className="w-24 py-2 px-4 rounded bg-black text-white mx-2"
                onClick={() => setAlertModal({ flag: false })}
              >
                No
              </button>
              <button
                className="w-24 py-2 px-4 rounded bg-black mx-2 text-white"
                onClick={() => handleRemove2()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------------------- */}
      {/* clear cart */}

      {alertModalClear.flag && (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-x-hidden overflow-y-auto z-40 top-0 left-0 w-full h-full outline-none">
          <div
            className="bg-white rounded-2xl md:w-[30%] w-[25%] overflow-y-scroll p-[30px]"
            style={{ maxHeight: "90vh" }}
          >
            <div
              className="flex justify-end"
              onClick={() => setAlertModalClear({ flag: false })}
            >
              <img src={Close} alt="" style={{ cursor: "pointer" }} />
            </div>
            <div className="my-[30px]">
              Are you sure you want to remove every item from the cart?
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="w-24 py-2 px-4 rounded bg-black text-white mx-2"
                onClick={() => setAlertModalClear({ flag: false })}
              >
                No
              </button>
              <button
                className="w-24 py-2 px-4 rounded bg-black mx-2 text-white"
                onClick={() => clearCart()}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
