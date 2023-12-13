import { useEffect, useState, lazy, Suspense } from "react";
import rightArrow from "images/rightArrow.png";
import { SPORT_PRODUCTS } from "data/data";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import SectionHero2 from "components/SectionHero/SectionHero2";
import Features from "components/FeaturedBrands/Features";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavItems } from "redux/HomePage/NavBarItemsApi";
import "../../App.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import category from "images/category.svg";
import {
  fetchNewArrivalProducts,
  fetchSaleItems,
  fetchTrendingProducts,
} from "redux/HomePage/fetchAllProducts";
import Offers from "components/Offers";
import Cookies from "js-cookie";
import { fetchCustomerData } from "redux/ProfilePage/CustomerApi";

import {
  TbCategory,
  TbHealthRecognition,
  TbBook2,
  TbHorseToy,
  TbDeviceMobileCharging,
  TbShirt,
  TbCar,
  TbPizza,
} from "react-icons/tb";

//Lazy loading components
const SectionGridFeatureItems = lazy(
  () => import("./others/SectionGridFeatureItems")
);
const SectionSliderProductCard2 = lazy(
  () => import("components/SectionSliderProductCard2")
);
const FeaturedBrands = lazy(
  () => import("components/FeaturedBrands/FeaturedBrands")
);

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginLoader = useSelector((state: any) => state.token.loginLoader);
  const filterData = useSelector(
    (state: any) => state.storeFilterData.filterData
  );
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const [visible, setVisible] = useState(4);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [visibleSubCategory, setVisibleSubCategory] = useState(7);
  const [subcatLength, setSubCatLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrendingCategories, setSelectedTrendingCategories] =
    useState("Others");

  const loadMore = () => {
    let arr: any = [];
    setVisible(visible + 4);
    // setOffset(visible *(offset + 1));
    setPage(page + 1);
  };

  const handleSelectedCategories = (val: any) => {
    setSelectedTrendingCategories(val);
  };

  // CHECKING COOKIE //
  // const EXPIRATION_TIME = 10; // 10 seconds
  // const COOKIE_NAME = "my_cookie";

  // const [isCookieExpired, setIsCookieExpired] = useState(true);

  // useEffect(() => {
  //   const cookie = Cookies.get(COOKIE_NAME);
  //   if (cookie) {
  //     const expirationTime = parseInt(cookie) + EXPIRATION_TIME;
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     setIsCookieExpired(currentTime >= expirationTime);
  //   } else {
  //     Cookies.set(COOKIE_NAME, Math.floor(Date.now() / 1000).toString());
  //     setIsCookieExpired(true);
  //   }
  // }, []);
  // CHECKING COOKIE END //

  ////////////// HOME PAGE DATA //////////////
  useEffect(() => {}, [dispatch, loginLoader]);

  const newArrivalProducts = useSelector(
    (state: any) => state.products.newArrivalProducts
  );
  const saleItems = useSelector((state: any) => state.products.saleItems);
  const trendingProducts = useSelector(
    (state: any) => state.products.trendingProducts
  );
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);
  const isNavBarLoading = useSelector(
    (state: any) => state.NavBar.isNavBarLoading
  );

  const fetchUserData = () => {
    dispatch(fetchCustomerData({ loginToken: loginToken }));
  };

  const getNewArrivalProducts = (): any => {
    dispatch(fetchNewArrivalProducts({ loginToken: loginToken }));
  };

  const getSaleItems = (): any => {
    return dispatch(fetchSaleItems({ loginToken: loginToken }));
  };

  const getNavItems = (): any => {
    return dispatch(fetchNavItems({ loginToken }));
  };

  const fetchTrending = () => {
    return dispatch(
      fetchTrendingProducts({
        loginToken: loginToken,
        trendingProductsPayload: {
          limit: visible,
          offset: offset,
          min_price: filterData?.minPrice,
          max_price: filterData?.maxPrice,
          on_sale: filterData?.isOnSale,
          category: selectedTrendingCategories,
          sort_by: filterData?.sortOrder ? filterData?.sortOrder : "NONE",
          sub_categories: filterData?.sub_category_data,
        },
      })
    );
  };

  const fetchAllApis = () => {
    getNewArrivalProducts();
    getSaleItems();
    fetchUserData();
    getNavItems();
  };

  useEffect(() => {
    // if (!isCookieExpired) {
    // if (
    //   newArrivalProducts?.length === 0 ||
    //   saleItems?.length === 0 ||
    //   trendingProducts?.length === 0 ||
    //   navBar?.length === 0
    // ) {
    if (loginToken !== "") fetchAllApis();
    // }
    // else {
    //   // Remove the locally stored data here
    //   console.log("REMOVED");
    //   localStorage.clear();
    // }
  }, [/*isCookieExpired,*/ loginToken]);

  useEffect(() => {
    fetchTrending();
  }, [loginToken, visible, offset, filterData, selectedTrendingCategories]);
  ////////////// HOME PAGE DATA END //////////////

  let base64Id: string;
  let base64Id_subCategories: string;
  let base64_Products_Flash: string;
  let base64_Products_New_Arrival: string;
  base64_Products_Flash = btoa("Flash Sale");
  base64_Products_New_Arrival = btoa("New Arrival");
  const handleSubmitBase64 = (category_name: string, category_id: string) => {
    base64Id = btoa(category_name);
    history.push(`/categories/${base64Id}`, { categoryId: category_id });
  };

  const handleSubmitBase64SubCategories = (
    category_name: string,
    category_id: string,
    sub_category_id: string,
    sub_category_name: string
  ) => {
    base64Id = btoa(category_name);
    base64Id_subCategories = btoa(sub_category_name);
    history.push(
      `/categories/${base64Id}?sub_category=${base64Id_subCategories}`
    );
  };

  var subcatLength1 = 0;
  const toggleOpen = (index: number, catId: number) => {
    setIsOpen(true);
    setCurrentIndex(index);
    setCurrentCategory(catId);
    subcatLength1 = navBar[index].sub_categories.length;
    setSubCatLength(subcatLength1);
  };

  const toggleclose = () => {
    // setIsOpen(false);
  };

  const trendingProductsLoader = useSelector(
    (state: any) => state.products.tpIsLoading
  );

  const RenderCategoryIcon = ({
    category,
    iconSize,
  }: {
    category: any;
    iconSize: number;
  }) => {
    if (category === "Health and Fitness")
      return <TbHealthRecognition size={iconSize} color={"#358BEE"} />;
    else if (category === "Books and Stationary")
      return <TbBook2 size={iconSize} color={"#358BEE"} />;
    else if (category === "Toys and Games")
      return <TbHorseToy size={iconSize} color={"#358BEE"} />;
    else if (category === "Mobile Phones & Electronics")
      return <TbDeviceMobileCharging size={iconSize} color={"#358BEE"} />;
    else if (category === "Baby Clothes and Gear")
      return <TbShirt size={iconSize} color={"#358BEE"} />;
    else if (category === "Auto and Tires")
      return <TbCar size={iconSize} color={"#358BEE"} />;
    else if (category === "Food Items")
      return <TbPizza size={iconSize} color={"#358BEE"} />;
    else return <TbCategory size={iconSize} color={"#358BEE"} />;
  };

  const globalLoader = useSelector(
    (state: any) => state.setGlobalLoader.globalLoader
  );

  return (
    <div>
      <Helmet>
        <title>Home || Askari Mall Ecommerce Template</title>
      </Helmet>

      {!globalLoader && !loginLoader ? (
        <div className="nc-PageHome2  overflow-hidden ">
          {/* Hero Section */}
          <div className="relative mb-10  grid md:px-4 mt-4 md:flex md:px-20 md:flex-row-reverse  lg:bg-[#F85505]">
            {/* slider */}
            <div className=" ">
              <div className="w-full md:w-[60vw] lg:w-[72vw]">
                <SectionHero2 />
              </div>
            </div>
            <div
              onMouseLeave={toggleclose}
              className="hidden md:block bg-[#FFF] pt-[10px] px-[10px] w-[20vw]">
              {/* category */}
              <div className="no-scrollbar overflow-y-auto h-[250px] sm:h-[150px] lg:h-[230px] xl:h-[350px] 2xl:h-[470px]  ">
                <div className="grid grid-cols-3  md:grid-cols-1 pt-4 md:pt-0 pb-4 md:pb-0 ">
                  {navBar?.map((items: any, index: number) => {
                    return (
                      <div
                        onMouseEnter={() =>
                          toggleOpen(index, items.category_id)
                        }
                        key={uuidv4()}
                        className="flex hover:bg-gray-200 items-center mb-[20px] justify-between cursor-pointer">
                        <div
                          className="w-[20%] rounded-md flex justify-center items-center"
                          style={{ backgroundColor: "#EDF7FF" }}>
                          <RenderCategoryIcon
                            category={items.category_name}
                            iconSize={32}
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
                              }>
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
                <div className="invisible md:visible no-scrollbar1 pt-2 overflow-y-auto absolute z-10 top-0 md:left-[30%] lg:left-[21%] xl:left-[22%] w-48  bg-[#FFF]  shadow-inner   h-[230px] sm:h-[200px] lg:h-[290px] xl:h-[360px] 2xl:h-[480px]">
                  {navBar?.map((items: any, index: number) => {
                    return (
                      <div key={uuidv4()}>
                        {currentCategory === items.category_id &&
                          items.sub_categories?.map((sub: any) => {
                            return (
                              <p
                                onClick={() =>
                                  handleSubmitBase64SubCategories(
                                    items.category_name,
                                    items.category_id,
                                    sub.sub_category_id,
                                    sub.sub_category_name
                                  )
                                }
                                key={uuidv4()}
                                className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
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

            <div className="bg-[#fff] grid grid-cols-4 gap-x-4 gap-y-1 md:hidden mt-[20px] px-3">
              {navBar
                ?.slice(0, visibleSubCategory)
                ?.map((items: any, index: number) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={`flex flex-col mb-[10px] mt-[10px] cursor-pointer`}
                      onClick={() =>
                        handleSubmitBase64(
                          items.category_name,
                          items.category_id
                        )
                      }>
                      <div
                        className="w-18 h-20 rounded-md flex justify-center items-center"
                        style={{ backgroundColor: "#EDF7FF" }}>
                        <RenderCategoryIcon
                          category={items.category_name}
                          iconSize={38}
                        />
                      </div>

                      <div className=" text-xs flex items-center mt-[5px]     justify-between   ">
                        <div className="text-center">
                          <p
                            title={items.category_name}
                            className="overflow-hidden truncate w-[80px]">
                            {items.category_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {visibleSubCategory < navBar?.length && (
                <div
                  className={`flex flex-col  mb-[10px] mt-[10px] cursor-pointer text-center`}
                  onClick={() =>
                    setVisibleSubCategory((current) => current + 8)
                  }>
                  <div
                    className="flex items-end w-18 h-20 rounded-md flex justify-center items-center"
                    style={{ backgroundColor: "#EDF7FF" }}>
                    <TbCategory size={38} color={"#358BEE"} />
                  </div>

                  <div className="text-xs mt-[5px] justify-between">
                    <p title={"See All"}>See more</p>
                  </div>
                </div>
              )}
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
              <Suspense fallback={<div></div>}>
                {saleItems?.length > 0 && (
                  <SectionSliderProductCard2
                    showSeeAll={false}
                    seeAllUrl={base64_Products_Flash}
                    data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
                    productData={saleItems}
                    heading="Flash Sale"
                  />
                )}
              </Suspense>
            </div>

            {/* Discover More */}

            {/* <Offers /> */}
            {/* What's trending */}
            <Suspense fallback={<div></div>}>
              <div style={{ marginTop: "4rem" }}>
                <SectionGridFeatureItems
                  data={SPORT_PRODUCTS}
                  productData={trendingProducts}
                  loadMore={loadMore}
                  showSeeMore={
                    trendingProducts["products"]?.length >= visible
                      ? true
                      : false
                  }
                  handleSelectedCategories={handleSelectedCategories}
                />
              </div>
            </Suspense>

            {/* Discover More */}
            {/* <div className="mt-14 lg:mt-32">
          <DiscoverMoreSlider /> 
        </div> */}

            {/* Featured Brands */}
            <Suspense fallback={<div></div>}>
              <div style={{ marginTop: "5rem", marginBottom: "6rem" }}>
                <FeaturedBrands />
              </div>
            </Suspense>

            {/* New Arrival */}
            <Suspense fallback={<div></div>}>
              {newArrivalProducts?.length > 0 && (
                <SectionSliderProductCard2
                  showSeeAll={false}
                  data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
                  productData={newArrivalProducts}
                  heading={"New Arrivals"}
                  seeAllUrl={base64_Products_New_Arrival}
                />
              )}
            </Suspense>

            {/* <div
              style={{
                marginBottom: "5rem",
                marginTop: "6rem",
              }}
            >
              <Features />
            </div> */}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            minHeight: "100vh",
            minWidth: "100vw",
            position: "absolute",
            zIndex: "99999",
          }}>
          {/* Loader */}
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#cbe5f7", "#0DA5E9", "#cbe5f7", "#0DA5E9", "#cbe5f7"]}
          />
        </div>
      )}
    </div>
  );
};
export default HomePage;
