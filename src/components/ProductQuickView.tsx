import React, { FC, useEffect, useReducer, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import LikeButton from "components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "components/BagIcon";
import NcInputNumber from "components/NcInputNumber";
import { PRODUCTS } from "data/data";
import { generateCheckoutUrl } from "redux/Checkout/generateCheckoutUrl";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import _ from "lodash";
import IconDiscount from "components/IconDiscount";
import Prices from "components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "images/products/detail1.jpg";
import detail2JPG from "images/products/detail2.jpg";
import detail3JPG from "images/products/detail3.jpg";
import NotifyAddTocart from "./NotifyAddTocart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  storeProductDetail,
  storeCartProduct,
} from "redux/Product/storeProductDetail";
import CheckoutModal from "containers/ProductDetailPage/CheckoutModal";
import ProductStatus from "./ProductStatus";
import { postFavouriteData } from "redux/Favourites/Favourites";
import { fetchCustomerData } from "redux/ProfilePage/CustomerApi";

export interface ProductQuickViewProps {
  className?: string;
  likeItem?: boolean;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({
  className = "",
  likeItem = false,
}) => {
  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];
  const [variantActive, setVariantActive] = React.useState(0);
  const [sizeSelected, setSizeSelected] = React.useState(sizes ? sizes[0] : "");
  const [quantitySelected, setQuantitySelected] = React.useState(1);
  const dispatch = useDispatch();
  const product = useSelector(
    (state: any) => state.storeProductDetail.productDetail
  );

  const [productData, setProductData] = useReducer((prev: any, next: any) => {
    return { ...prev, ...next };
  }, {});

  const generateCheckoutURL = useSelector(
    (state: any) => state.CheckoutURL.urlData
  );
  const loading = useSelector(
    (state: any) => state.CheckoutURL.generateUrlIsLoading
  );
  const loginToken = useSelector((state: any) => state.token.loginToken);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const customerData = useSelector((state: any) => state.Customer);

  useEffect(() => {
    dispatch(fetchCustomerData({ loginToken: loginToken }));
    console.log("CUSTOMER DATA: ", customerData);
  }, [dispatch]);
  useEffect(() => {
    if (product?.product_attributes.length > 0) {
      const names = product?.product_attributes?.map((a: any) => a.name);
      setAttributes(names);

      setVariantsParent(product?.variants_parent_child_relation);

      product?.product_attributes?.map((items: any) => {
        setProductData({ [items.name]: "" });
      });
    }
  }, [product]);

  const [apiData, setApiData] = useState<any>([]);
  const [variantsParent, setVariantsParent] = useState<any>({});
  const [attributes, setAttributes] = useState<any>();
  function filterOption(selectedObj: any) {
    let selectedObjKeys;
    let selectedObjValues: any;
    let final_value: any;
    let final_obj: any;
    selectedObjKeys = Object.keys(selectedObj);
    if (Object.keys(variantsParent).length > 0 && attributes.length > 0) {
      if (selectedObjKeys.length > 0) {
        selectedObjValues = Object.values(selectedObj);
      }
      if (
        selectedObjKeys.length === 0 &&
        variantsParent[attributes[0]] instanceof Array
      ) {
        return (final_obj = { [attributes[0]]: variantsParent[attributes[0]] });
      } else if (
        selectedObjKeys.length === 0 &&
        variantsParent[attributes[0]] instanceof Object
      ) {
        final_value = variantsParent[attributes[0]];
        return (final_obj = { [attributes[0]]: Object.keys(final_value) });
      } else if (
        attributes.length >= selectedObjKeys.length &&
        selectedObjKeys.length > 0
      ) {
        let final_item: any;
        if (attributes.length > selectedObjKeys.length) {
          final_value = variantsParent[attributes[selectedObjKeys.length]];
          final_item = attributes[selectedObjKeys.length];
        } else if (attributes.length === selectedObjKeys.length) {
          final_value = variantsParent[attributes[selectedObjKeys.length - 1]];
          final_item = "variant_id";
        }
        for (let j = 0; j < selectedObjValues.length; j++) {
          if (final_value instanceof Object) {
            final_value = final_value[selectedObjValues[j]];
            if (
              j === selectedObjValues.length - 1 &&
              !(final_value instanceof Array) &&
              final_value instanceof Object
            ) {
              final_value = Object.keys(final_value);
            }
          }
        }

        return (final_obj = { [final_item]: final_value });
      }
    }
  }

  const [selectedOBj, setSelectedOBj] = useState<any>({});
  const [menuOption, setMenuOption] = useState<any>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const hanleMenuOptions = (data: any) => {
    let newObj = { ...selectedOBj };
    Object.assign(newObj, data);
    let array = [...menuOption];
    array[selectIndex] = newObj;
    setMenuOption(array);
  };

  useEffect(() => {
    let data = filterOption(selectedOBj);

    if (data !== undefined) hanleMenuOptions(data);
  }, [selectedOBj, variantsParent, attributes]);

  const restoreProductDataValues = (parentIndex: number) => {
    const storeArray: Array<[string, any]> = [];
    Object.entries(productData).forEach(([key, value], index) => {
      if (index > parentIndex) storeArray.push([key, ""]);
      else storeArray.push([key, value]);
    });

    const restoredObject: { [key: string]: string } = {};
    storeArray.forEach(([key, value]) => {
      restoredObject[key] = value;
    });

    setProductData(restoredObject);
  };

  const handleSelectValue = (item: any, sub: any, index: number) => {
    if (menuOption.length > index + 2) {
      let reduceMenuArray = [...menuOption];
      let reduceSelectedObj = { ...selectedOBj };
      let result = Object.keys(reduceSelectedObj)
        .slice(0, index + 1)
        .reduce((result: any, key: any) => {
          result[key] = reduceSelectedObj[key];
          return result;
        }, {});

      if (result[item.name]) {
        result[item.name] = sub;
      } else {
        Object.assign(result, { [item.name]: sub });
      }
      setMenuOption(reduceMenuArray.slice(0, index + 1));
      setSelectedOBj(result);
      restoreProductDataValues(index);
      setProductData({ [item.name]: "" });
    } else {
      let newObj = { ...selectedOBj };
      if (newObj[item.name]) {
        newObj[item.name] = sub;
      } else {
        Object.assign(newObj, { [item.name]: sub });
      }
      setSelectedOBj(newObj);
    }
  };
  const cartData = useSelector(
    (state: any) => state.storeProductDetail.productCartData
  );

  const handleStoreCartData = () => {
    let tempArray: any = [...cartData];
    let tempProduct: any = { ...product };
    tempProduct.quantity = quantitySelected;
    tempProduct.selectedVariant = productData;
    tempArray.push(tempProduct);
    dispatch(storeCartProduct(tempArray));
    notifyAddTocart(tempProduct);
  };

  const notifyAddTocart = (product: any) => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={LIST_IMAGES_DEMO[0]}
          quantitySelected={quantitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
          product={product}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSizeList = (productAttributes: any, parentIndex: any) => {
    if (productAttributes.length === 0) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              {productAttributes.name.charAt(0).toUpperCase() +
                productAttributes.name.slice(1)}
              :
              <span className="ml-1 font-semibold">
                {productData[productAttributes.name]?.charAt(0).toUpperCase() +
                  productData[productAttributes.name]?.slice(1)}
              </span>
            </span>
          </label>
          <p
            // target="_blank"
            // rel="noopener noreferrer"
            // href="##"
            className="text-slate-500"
          >
            Select your {productAttributes.name.toLowerCase()}
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 mt-2.5">
          {menuOption[parentIndex] !== undefined && menuOption.length > 0
            ? menuOption[parentIndex][productAttributes.name]?.map(
                (sub: any, index: number) => {
                  return (
                    // "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    <div
                      key={index}
                      className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer ${
                        productData[productAttributes.name] !== "" &&
                        productData[productAttributes.name].toUpperCase() ===
                          sub.toUpperCase()
                          ? "bg-primary-6000 border-gray-400 text-white hover:bg-#f5f8fb-600 bg-gray-400"
                          : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 bg-white-500"
                      }`}
                      onClick={() => {
                        setSelectIndex(parentIndex + 1);
                        handleSelectValue(productAttributes, sub, parentIndex);
                        setProductData({
                          [productAttributes.name]: sub,
                        });
                      }}
                    >
                      {sub.slice(0, 10)}
                      {sub.length > 10 && "..."}
                    </div>
                  );
                }
              )
            : productAttributes?.attribute_options?.map(
                (items: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={
                        "relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 border-slate-300 dark:border-slate-600 text-slate-200 dark:text-slate-200 cursor-not-allowed"
                      }
                    >
                      {items}
                    </div>
                  );
                }
              )}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    // if (status === "New in") {
    //   return (
    //     <div className={CLASSES}>
    //       <SparklesIcon className="w-3.5 h-3.5" />
    //       <span className="ml-1 leading-none">{status}</span>
    //     </div>
    //   );
    // }
    if (status === "discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  function handleButtonDisable() {
    if (menuOption.length > 0) {
      return !("variant_id" in menuOption[menuOption.length - 1]);
    } else return true;
  }

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

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold">
            {product.product_info.title !== ""
              ? product.product_info.title
              : "Product Title"}
          </h2>
          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <>
              {product.product_attributes.length > 0 ? (
                getVariantPrice(productData)
              ) : (
                <Prices
                  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                  salePrice={product?.product_info?.sale_price}
                  price={
                    product.product_info.price !== 0
                      ? product.product_info.price
                      : 0.0
                  }
                />
              )}
            </>
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}

            <div className="h-6 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <Link
                to="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  {/* <span>{product.average_rating}</span> */}
                  {/* <span className="block mx-2">·</span> */}
                  <span className="text-slate-600 dark:text-slate-400 ">
                    ({product.num_of_reviews} reviews)
                  </span>
                </div>
              </Link>
              {/* <span className="hidden sm:block mx-2.5">·</span> */}
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none"> {status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}
        <div className="">
          {product?.product_attributes.length > 0 && (
            <>
              {product?.product_attributes?.map(
                (items: any, parentIndex: any) => {
                  return (
                    <div style={{ marginBottom: "20pt" }}>
                      {renderSizeList(items, parentIndex)}
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>
        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2  rounded-full">
            <NcInputNumber
              maxValue={
                product.product_info.available_stock &&
                product.product_info.available_stock
              }
              defaultValue={quantitySelected}
              onChange={setQuantitySelected}
            />{" "}
          </div>
          <ButtonPrimary
            className={`${
              loading === true ||
              (product.product_attributes.length > 0 && handleButtonDisable())
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } ml-2`}
            onClick={async () => {
              const array: any = [];
              let tempObj: any = {};
              tempObj.product_id = product["product_info"].id;
              tempObj.product_merchant_user_id =
                product["product_info"].merchant_user_id;
              tempObj.quantity = quantitySelected;
              tempObj.merchant_product_id = Number(
                product["product_info"].merchant_product_id
              );
              product["product_variants"].length > 0 &&
                product["product_variants"].forEach((items: any, i: number) => {
                  if (_.isEqual(productData, items.variant_attributes)) {
                    tempObj.variant_id = items.id;
                    tempObj.merchant_variant_id = Number(
                      items.merchant_variant_id
                    );
                  } else {
                  }
                });
              if (product["product_variants"].length === 0) {
                tempObj.variant_id = 0;
                tempObj.merchant_variant_id = 0;
              }
              array.push(tempObj);
              await dispatch(
                generateCheckoutUrl({
                  loginToken: loginToken,
                  phone_number: customerData
                    ? customerData?.customerData?.phone_number
                    : "",
                  data: array,
                })
              );
              if (loading === false) setShowModal(true);
            }}
            disabled={
              loading === true ||
              (product.product_attributes.length > 0 && handleButtonDisable())
            }
          >
            Buy Now
          </ButtonPrimary>

          {showModal ? (
            <>
              <CheckoutModal
                url={generateCheckoutURL}
                closeModal={closeModal}
              />
            </>
          ) : null}

          <ButtonPrimary
            className={` ${
              product.product_attributes.length > 0 && handleButtonDisable()
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } ml-2`}
            onClick={() => handleStoreCartData()}
            disabled={
              product.product_attributes.length > 0 && handleButtonDisable()
            }
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className="border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        {product.product_info.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: product.product_info.description,
            }}
          />
        )}
      </div>
    );
  };

  function calculateDiscountPercentage(realPrice: number, salePrice: number) {
    let discountPercentage = Math.floor(
      ((realPrice - salePrice) / realPrice) * 100
    );
    return discountPercentage;
  }

  const [like, setLike] = useState<boolean>(product?.is_liked);

  const addFavourite = (id: any) => {
    setLike(!like);

    const payload = {
      product_id: id,
      status: like ? "LIKED" : "DISLIKED",
    };

    dispatch(postFavouriteData({ loginToken: loginToken, payload: payload }));
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              {product.product_info?.image && (
                <img
                  src={product.product_info.image}
                  className="w-full rounded-xl object-cover"
                  alt="product detail 1"
                />
              )}
            </div>

            {product.product_info.sale_price &&
              product.product_info.sale_price > 0 && (
                <ProductStatus
                  status={"discount"}
                  discountedAmount={Math.round(
                    product?.discount_percentage * 100
                  )}
                />
              )}

            {/* STATUS */}
            {renderStatus()}
            {/* META wishlist */}
            <div onClick={() => addFavourite(product?.product_info?.id)}>
              <LikeButton
                id={product?.product_info?.id}
                liked={product?.is_liked === "LIKED" ? true : false}
                className="absolute right-3 top-3 "
              />
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {product.product_images.length > 0
              ? product?.product_images?.map((item: any, index: number) => {
                  if (index < 2)
                    return (
                      <>
                        <div key={index} className="aspect-w-3 aspect-h-4">
                          <img
                            src={item.image_url}
                            className="w-full rounded-xl object-cover"
                            alt="product_image"
                          />
                        </div>
                        {product.product_images.length === 1 && (
                          <div key={index} className="aspect-w-3 aspect-h-4">
                            <img
                              src={item.image_url}
                              className="w-full rounded-xl object-cover"
                              alt="product_image"
                            />
                          </div>
                        )}
                      </>
                    );
                })
              : [
                  product?.product_info?.image,
                  product?.product_info?.image,
                ].map((item, index) => {
                  return (
                    <div key={index} className="aspect-w-3 aspect-h-4">
                      <img
                        src={item}
                        className="w-full rounded-xl object-cover"
                        alt="product_image"
                      />
                    </div>
                  );
                })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
