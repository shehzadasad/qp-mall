import React, { FC, useEffect, useState, useReducer } from "react";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Prices from "components/Prices";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useHistory } from "react-router-dom";
import Close from "../../images/close.svg";
import _ from "lodash";
import { generateCheckoutUrl } from "redux/Checkout/generateCheckoutUrl";
import {
  storeCartProduct,
  incrementQuantity,
} from "redux/Product/storeProductDetail";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import CheckoutModal from "./CheckoutModal";
import { fetchCustomerData } from "redux/ProfilePage/CustomerApi";

var currencyFormatter = require("currency-formatter");

const CartPage = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(
    (state: any) => state.storeProductDetail.productCartData
  );
  console.log(cartData);
  const generateCheckoutURL = useSelector(
    (state: any) => state.CheckoutURL.urlData
  );
  const loading = useSelector(
    (state: any) => state.CheckoutURL.generateUrlIsLoading
  );
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const customerData = useSelector((state: any) => state.Customer);

  const [apiData, setApiData] = useState<any>([]);

  useEffect(() => {
    const array: any = [];
    cartData.forEach((item: any, index1: number) => {
      let tempObj: any = {};
      tempObj.product_id = item.product_info.id;
      tempObj.product_merchant_user_id = item.product_info.merchant_user_id;
      tempObj.quantity = item.quantity;
      tempObj.merchant_product_id = Number(
        item.product_info.merchant_product_id
      );
      item.product_variants.length > 0 &&
        item.product_variants.forEach((items: any, index2: number) => {
          // console.log(item.selectedVariant, items.variant_attributes);
          if (_.isEqual(item.selectedVariant, items.variant_attributes)) {
            tempObj.variant_id = items.id;

            tempObj.merchant_variant_id = Number(items.merchant_variant_id);
          } else {
          }
        });
      if (item.product_variants.length === 0) {
        tempObj.variant_id = 0;
        tempObj.merchant_variant_id = 0;
      }

      array.push(tempObj);
    });
    setApiData(array);
  }, [cartData]);

  const [alertModal, setAlertModal] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      flag: false,
      index: 0,
    }
  );

  useEffect(() => {
    dispatch(fetchCustomerData({ loginToken: loginToken }));
  }, [dispatch]);

  const [alertModalClear, setAlertModalClear] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      flag: false,
      index: 0,
    }
  );

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
  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
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

  const renderProduct = (item: any, index: number) => {
    let objectLength = 0;

    if (item?.selectedVariant != null) {
      objectLength = Object.keys(item.selectedVariant).length;
    }

    return (
      <div
        key={item.product_info.id}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={item.product_info.image}
            alt={"img"}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link to="/product-detail">{item.product_info.title}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  {objectLength > 0 ? (
                    <div>
                      <div className="flex items-center space-x-1.5 mb-4">
                        {Object?.values(item.selectedVariant)?.map(
                          (value: any, index: number) => {
                            return (
                              <div key={index}>
                                {index !== 0 && (
                                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 "></span>
                                )}

                                <span>{value}</span>
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="flex items-center mb-0.5">
                        <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                        <span
                          className="ml-1 text-slate-500 dark:text-slate-400"
                          style={{ fontSize: "12px" }}
                        >
                          {/* {item.average_rating}  */}({item.num_of_reviews}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center mb-0.5">
                      <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                      <span
                        className="ml-1 text-slate-500 dark:text-slate-400"
                        style={{ fontSize: "12px" }}
                      >
                        {/* {item.average_rating}  */}({item.num_of_reviews}{" "}
                        reviews)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  {/* <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select> */}

                  <NcInputNumber
                    maxValue={item.product_info.available_stock}
                    className="relative z-10"
                    defaultValue={item.quantity}
                    index={index}
                    productId={item.product_info.id}
                  />

                  <>
                    {item?.selectedVariant &&
                    Object.keys(item.selectedVariant).length > 0 ? (
                      getVariantPrice(item, item.selectedVariant)
                    ) : (
                      <Prices
                        contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                        price={item.product_info.price}
                        salePrice={item?.product_info?.sale_price}
                      />
                    )}
                  </>
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                <NcInputNumber
                  className="relative z-10"
                  defaultValue={item.quantity}
                  index={index}
                  productId={item.product_info.id}
                />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                {item?.selectedVariant &&
                Object.keys(item.selectedVariant).length > 0 ? (
                  getVariantPrice(item, item.selectedVariant)
                ) : (
                  <Prices
                    price={item.product_info.price}
                    salePrice={item?.product_info?.sale_price}
                    className="mt-0.5"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* {Math.random() > 0.6
              ? renderStatusSoldout()
              : renderStatusInstock()} */}
            <div></div>

            <button
              type="button"
              className="font-medium text-primary-6000 dark:text-primary-500 "
              onClick={() => handleRemove(index)}
            >
              <span>Remove</span>
            </button>
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

  interface NcInputNumberProps {
    className?: string;
    defaultValue?: number;
    maxValue?: number;
    min?: number;
    onChange?: (value: number) => void;
    label?: string;
    desc?: string;
    index?: number;
    productId?: number;
  }

  const NcInputNumber: FC<NcInputNumberProps> = ({
    className = "w-full",
    defaultValue = 1,
    min = 1,
    maxValue = 9999,
    onChange,
    label,
    desc,
    index = 0,
    productId,
  }) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const handleClickDecrement = () => {
      if (min >= value) return;
      setValue((state) => {
        return state - 1;
      });
      onChange && onChange(value - 1);

      let tempObj: any = { id: productId, value: value - 1 };
      if (productId !== undefined) dispatch(incrementQuantity(tempObj));
    };

    const handleClickIncrement = () => {
      if (maxValue && maxValue <= value) return;
      setValue((state) => {
        return state + 1;
      });
      onChange && onChange(value + 1);

      let tempObj: any = { id: productId, value: value + 1 };
      if (productId !== undefined) dispatch(incrementQuantity(tempObj));
    };

    const renderLabel = () => {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {label}
          </span>
          {desc && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              {desc}
            </span>
          )}
        </div>
      );
    };

    return (
      <div
        className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      >
        {label && renderLabel()}

        <div
          className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
        >
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
            type="button"
            onClick={() => handleClickDecrement()}
            disabled={min >= value}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="select-none block flex-1 text-center leading-none">
            {value}
          </span>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
            type="button"
            onClick={() => handleClickIncrement()}
            disabled={maxValue ? maxValue <= value : false}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="nc-CartPage">
        <Helmet>
          <title>Shopping Cart || Askari Mall Ecommerce Template</title>
        </Helmet>

        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </button> */}
        {showModal ? (
          <>
            <CheckoutModal url={generateCheckoutURL} closeModal={closeModal} />
          </>
        ) : null}

        <main className="container py-16 lg:pb-28 lg:pt-20 ">
          <div className="mb-12 sm:mb-16">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
              Shopping Cart
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link to={"/"} className="">
                Homepage
              </Link>
              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline">Shopping Cart</span>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
              {cartData.length === 0 && (
                <div className="flex justify-center mt-6 mb-3">
                  Cart is empty!
                </div>
              )}
              {cartData &&
                cartData.length > 0 &&
                cartData?.map((item: any, index: any) =>
                  renderProduct(item, index)
                )}
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="sticky top-28">
                <h3 className="text-lg font-semibold ">Order Summary</h3>
                <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                  <div className="flex justify-between pb-4">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      {currencyFormatter.format(getTotalprice(), {
                        code: "PKR",
                        format: "%s %v",
                        precision: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span>Shpping estimate</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      -
                    </span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span>Tax estimate</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      -
                    </span>
                  </div>

                  <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                    <span>Order total</span>
                    <span>
                      {currencyFormatter.format(getTotalprice(), {
                        code: "PKR",
                        format: "%s %v",
                        precision: 0,
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal py-4">
                    Shipping and taxes are going to be calculated at checkout.
                  </span>
                </div>

                <ButtonPrimary
                  // href="/checkout"
                  className={`mt-8 w-full ${
                    cartData.length === 0 || loading === true
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={async () => {
                    await dispatch(
                      generateCheckoutUrl({
                        loginToken: loginToken,
                        phone_number: customerData
                          ? customerData?.customerData?.phone_number
                          : "",
                        data: apiData,
                      })
                    );
                    if (loading === false) setShowModal(true);
                  }}
                  disabled={
                    loading === true || (cartData?.length === 0 && true)
                  }
                >
                  Checkout
                </ButtonPrimary>
                <ButtonSecondary
                  className={`mt-8 w-full ${
                    cartData.length === 0 || loading === true
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } flex-1 border border-slate-200 dark:border-slate-700`}
                  onClick={() =>
                    cartData.length === 0 || loading === true
                      ? ""
                      : handleRemoveCart()
                  }
                >
                  Clear Cart
                </ButtonSecondary>
                {/* <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <p className="block relative pl-5">
                    <svg
                      className="w-4 h-4 absolute -left-1 top-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9945 16H12.0035"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Learn more{` `}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-slate-900 dark:text-slate-200 underline font-medium"
                    >
                      Taxes
                    </a>
                    <span>
                      {` `}and{` `}
                    </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-slate-900 dark:text-slate-200 underline font-medium"
                    >
                      Shipping
                    </a>
                    {` `} infomation
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
      {alertModal.flag && (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-x-hidden overflow-y-auto z-40 top-0 left-0 w-full h-full outline-none">
          <div
            className="bg-white rounded-2xl md:w-[30%] w-[75%] text-center overflow-y-scroll p-[30px]"
            style={{ maxHeight: "90vh" }}
          >
            <div
              className="flex justify-end"
              onClick={() => setAlertModal({ flag: false })}
            >
              <img src={Close} alt="" style={{ cursor: "pointer" }} />
            </div>
            <div className="my-[30px]">
              Are you sure you want to remove this item?
            </div>
            <div className="flex justify-center mt-8">
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
    </>
  );
};

export default CartPage;
