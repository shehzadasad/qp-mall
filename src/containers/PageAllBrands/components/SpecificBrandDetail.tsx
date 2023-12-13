import React, { useEffect, useState } from "react";
import rightArrow from "images/rightArrow.png";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import { SPORT_PRODUCTS } from "data/data";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import SectionSliderProductCard2 from "components/SectionSliderProductCard2";
import SectionHero2 from "components/SectionHero/SectionHero2";
import FeaturedBrands from "components/FeaturedBrands/FeaturedBrands";
import Features from "components/FeaturedBrands/Features";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavItems } from "redux/HomePage/NavBarItemsApi";
import "../../App.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import category from "images/category.svg";
import {
  fetchNewArrivalProducts,
  fetchSaleItems,
  fetchSimilarProducts,
  fetchTrendingProducts,
} from "redux/HomePage/fetchAllProducts";
import Offers from "components/Offers";

const SpecificBrandDetail = () => {
  const loginLoader = useSelector((state: any) => state.token.loginLoader);
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const newArrivalProducts = useSelector(
    (state: any) => state.products.newArrivalProducts
  );
  const [visible, setVisible] = useState(4);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [visibleSubCategory, setVisibleSubCategory] = useState(7);
  const [subcatLength, setSubCatLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loadMore = () => {
    setVisible(visible + 4);

    setOffset(offset + 1);
    fetchAllProduct();
  };

  const saleItems = useSelector((state: any) => state.products.saleItems);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchAllProduct = () => {
    dispatch(fetchNewArrivalProducts({ loginToken: loginToken }));
    dispatch(fetchSaleItems({ loginToken: loginToken }));
    dispatch(
      fetchTrendingProducts({
        loginToken: loginToken,
        trendingProductsPayload: {
          limit: visible,
          offset: offset,
          min_price: 0,
          max_price: 1000,
          category: "services",
          on_sale: false,
        },
      })
    );
    dispatch(
      fetchSimilarProducts({
        loginToken: loginToken,
        similarProductsPayload: {
          limit: 10,
          offset: 0,
          category: "Others",
          tags: ["Headphones", "Mouse", "Gaming Mic & Pads"],
        },
      })
    );
  };

  useEffect(() => {
    if (loginToken !== "") fetchAllProduct();
  }, [dispatch, loginToken]);
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);

  // const fetchNavItem = () => {
  //   dispatch(fetchNavItems({ loginToken }));
  // };

  // useEffect(() => {
  //   if (loginToken) {
  //     fetchNavItem();
  //   }
  // }, [loginToken]);

  let base64Id: string;
  const handleSubmitBase64 = (category_name: string, category_id: string) => {
    base64Id = btoa(category_id);
    history.push(`/categories/${base64Id}`);
  };
  const [isOpen, setIsOpen] = useState(false);
  var subcatLength1 = 0;
  const toggleOpen = (index: number, catId: number) => {
    setIsOpen(true);
    setCurrentIndex(index);
    setCurrentCategory(catId);
    subcatLength1 = navBar[index].sub_categories.length;
    setSubCatLength(subcatLength1);
  };
  const toggleclose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {!loginLoader && (
        <div className="nc-PageHome2  overflow-hidden ">
          {/* Hero Section */}

          <div className="relative mb-14  grid md:px-4 mt-4 md:flex md:px-20 md:flex-row-reverse  bg-[#F85505]">
            {/* slider */}
            <div className=" ">
              <div className="w-full md:w-[60vw] lg:w-[72vw]">
                <SectionHero2 />
              </div>
            </div>
            <div
              onMouseLeave={toggleclose}
              className="hidden md:block bg-[#FFF] pt-[10px] px-[10px] "
            >
              {/* category */}
              <div className="no-scrollbar overflow-y-auto  ">
                <div className="grid grid-cols-3  md:grid-cols-1 pt-4 md:pt-0 pb-4 md:pb-0 ">
                  {navBar?.map((items: any, index: number) => {
                    return (
                      <div
                        onMouseEnter={() =>
                          toggleOpen(index, items.category_id)
                        }
                        key={uuidv4()}
                        className="flex hover:bg-gray-200 items-center mb-[20px] justify-between cursor-pointer"
                      >
                        <div className="w-[20%]  ">
                          <img
                            src={category}
                            alt=""
                            width={"50px"}
                            height={"50px"}
                          />
                        </div>

                        <div className="w-[80%] text-xs flex items-center mt-[5px]    justify-between   ">
                          <div className="">
                            <p
                              className="ml-[5px]  w-[11vw]"
                              onClick={() =>
                                handleSubmitBase64(
                                  items.category_name,
                                  items.category_id
                                )
                              }
                            >
                              {items.category_name}
                            </p>
                          </div>

                          <div className="">
                            {currentIndex === index &&
                            isOpen &&
                            subcatLength > 0 ? (
                              <img
                                src={rightArrow}
                                width="10px"
                                height={"10px"}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {subcatLength > 0 && isOpen && (
                <div className="invisible lg:visible no-scrollbar1 pt-2 overflow-y-auto absolute z-10 top-0 left-[323px] w-48  bg-[#FFF]  shadow-inner ">
                  {navBar?.map((items: any, index: number) => {
                    return (
                      <div key={uuidv4()}>
                        {currentCategory === items.category_id &&
                          items.sub_categories.map((sub: any) => {
                            return (
                              <p
                                onClick={() =>
                                  handleSubmitBase64(
                                    items.category_name,
                                    items.category_id
                                  )
                                }
                                key={uuidv4()}
                                className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 "
                              >
                                {sub.sub_category_name}
                              </p>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bg-[#fff] grid grid-cols-4 gap-2 md:hidden mt-[20px] px-2 ">
              {navBar
                ?.slice(0, visibleSubCategory)
                ?.map((items: any, index: number) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="flex   flex-col  items-center mb-[20px] mt-[20px] cursor-pointer "
                    >
                      <div className="">
                        <img
                          src={category}
                          alt=""
                          width={"50px"}
                          height={"50px"}
                        />
                      </div>

                      <div className=" text-xs flex items-center mt-[5px]     justify-between   ">
                        <div className="text-center">
                          <p
                            className="overflow-hidden truncate w-[65px]"
                            onClick={() =>
                              handleSubmitBase64(
                                items.category_name,
                                items.category_id
                              )
                            }
                          >
                            {items.category_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="flex flex-col items-center mt-[20px]">
                <img src={category} alt="" width={"50px"} height={"50px"} />
                <p
                  className="ml-[5px] mt-[5px] w-[50px] text-xs"
                  onClick={() => alert("see all")}
                >
                  See all
                </p>
              </div>
            </div>
            {/* subcategory div */}
          </div>

          <div
            style={{
              marginBottom: "10rem",
              // width: "100%",
              marginLeft: "6%",
              marginRight: "5%",
            }}
            // className="container relative space-y-14 my-14 lg:space-y-32  mb-8 w-full"
          >
            {/* Flash Sales */}
            <div className="mb-4">
              {saleItems.length > 0 && (
                <SectionSliderProductCard2
                  data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
                  productData={saleItems}
                  subHeading="Buy Now"
                  heading="Flash Sale"
                />
              )}
            </div>

            {/* Discover More */}

            <Offers />
            {/* What's trending */}

            {/* Discover More */}
            {/* <div className="mt-14 lg:mt-32">
              <DiscoverMoreSlider /> 
            </div> */}

            {/* Featured Brands */}
            <div style={{ marginTop: "6rem", marginBottom: "6rem" }}>
              <FeaturedBrands />
            </div>

            {/* New Arrival */}
            {newArrivalProducts?.length > 0 && (
              <SectionSliderProductCard2
                data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
                productData={newArrivalProducts}
                subHeading="New Sports Equipment"
              />
            )}
            <div
              style={{
                marginBottom: "5rem",
                marginTop: "6rem",
              }}
            >
              <Features />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SpecificBrandDetail;
