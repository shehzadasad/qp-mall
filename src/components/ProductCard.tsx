import React, { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "data/data";
import { NoSymbolIcon, StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import ModalQuickView from "./ModalQuickView";
import IconDiscount from "components/IconDiscount";
import ProductStatus from "./ProductStatus";
import {
  fetchFavourites,
  postFavouriteData,
} from "redux/Favourites/Favourites";
import { useDispatch, useSelector } from "react-redux";
import {
  storeProductDetail,
  storeCartProduct,
} from "redux/Product/storeProductDetail";

export interface ProductDataInterface {
  id: any;
  title: string;
  price: number;
  image: string;
  link: string;
}
export interface ProductCardProps {
  className?: string;
  data?: Product;
  likeItem?: string;
  isLiked?: boolean;
  productData?: ProductDataInterface;
  productVarients?: any[];
  product?: any;
  heading?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  likeItem = "",
  productData = {
    id: "",
    title: "",
    price: 0,
    image: "",
    link: "/product-detail/",
  },
  product = {},
  productVarients = {},
  heading,
}) => {
  const {
    name,
    price,
    description,
    sizes,
    variants,
    variantType,
    status,
    image,
  } = data;

  const [variantActive, setVariantActive] = React.useState(0);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);
  const [like, setLike] = useState<boolean>();
  const [currentID, setCurrentID] = useState("");
  const loginToken = useSelector((state: any) => state.token.loginToken);

  const dispatch = useDispatch();
  const handleProductDetail = (check: boolean) => {
    dispatch(storeProductDetail(product));
    if (check) setShowModalQuickView(true);
  };

  useEffect(() => {
    setLike(likeItem === "LIKED" ? true : false);
  }, [likeItem]);

  const addFavourite = (id: any) => {
    setCurrentID(id);
    setLike(!like);

    const payload = {
      product_id: productData.id,
      status: !like ? "LIKED" : "DISLIKED",
    };

    dispatch(postFavouriteData({ loginToken: loginToken, payload: payload }));
  };

  const history = useHistory();

  const cartData = useSelector(
    (state: any) => state.storeProductDetail.productCartData
  );

  const handleStoreCartData = () => {
    let tempArray: any = [...cartData];
    let tempProduct: any = { ...product };
    tempProduct.quantity = 1;
    tempArray.push(tempProduct);
    dispatch(storeCartProduct(tempArray));
    notifyAddTocart(tempProduct);
  };

  const notifyAddTocart = (product: any) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20">
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify(product)}
        </Transition>
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderProductCartOnNotify = (product: any) => {
    let objectLength = 0;
    if (product?.selectedVariant != null) {
      objectLength = Object.keys(product.selectedVariant).length;
    }

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
              <Prices
                price={product.product_info.price}
                salePrice={product?.product_info?.sale_price}
                className="mt-0.5"
              />
            </div>

            <div className="flex justify-between items-end ">
              {/*With Variants*/}
              {objectLength > 0 ? (
                <p
                  className="text-sm text-slate-500 dark:text-slate-400"
                  style={{ display: "flex" }}>
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
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  history.push("cart");
                }}>
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex space-x-1">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                variantActive === index
                  ? getBorderClass(variant.color)
                  : "border-transparent"
              }`}
              title={variant.name}>
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
              variantActive === index
                ? "border-black dark:border-slate-300"
                : "border-transparent"
            }`}
            title={variant.name}>
            <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
              <img
                src={variant.thumbnail}
                alt="variant"
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = (id: any, products: any) => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {products.product_attributes &&
          products.product_attributes.length === 0 && (
            <ButtonPrimary
              className="shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
              onClick={() => handleStoreCartData()}>
              <BagIcon className="w-3.5 h-3.5 mb-0.5" />
              <span className="ml-1">Add to bag</span>
            </ButtonPrimary>
          )}

        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => handleProductDetail(true)}>
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard">
        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={"/product-detail"} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={productData.image}
              className="object-cover w-full h-full drop-shadow-xl"
              onClick={() => handleProductDetail(false)}
            />
          </Link>

          {product?.product_info?.sale_price && (
            <ProductStatus
              status={"discount"}
              discountedAmount={Math.round(product?.discount_percentage * 100)}
            />
          )}

          <div onClick={() => addFavourite(productData.id)}>
            <LikeButton
              liked={
                productData.id === currentID
                  ? like
                  : likeItem === "LIKED"
                  ? true
                  : false
              }
              id={productData.id}
              className="absolute top-3 right-3 z-10"
            />
          </div>
          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}
          {renderGroupButtons(productData.id, product)}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}
          <div style={{ height: "40pt" }}>
            <Link to={"/product-detail"} className="block">
              <h2
                data-tooltip-target="tooltip-top"
                data-tooltip-placement="top"
                className={`nc-ProductCard__title text-base font-semibold transition-colors`}
                onClick={() => handleProductDetail(false)}>
                {productData?.title.length < 57
                  ? productData?.title
                  : productData?.title.substring(0, 57) + "..."}
              </h2>
            </Link>
            <div
              id="tooltip-top"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              {productData?.title}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>

          <div className="flex justify-between items-end ">
            <Prices
              price={productData.price}
              salePrice={product?.product_info?.sale_price}
            />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                {/* {product.average_rating} */}({product.num_of_reviews}{" "}
                reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
