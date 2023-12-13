import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import ProductCard from "components/ProductCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "data/data";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import noproduct from "images/collections/noproduct.png";

//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
  productData?: any;
  loadMore?: any;
  handleSelectedCategories?: any;
  showSeeMore?: boolean;
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = PRODUCTS,
  productData = [],
  loadMore,
  showSeeMore = false,
  handleSelectedCategories,
}) => {
  const handlePagination = async () => {
    await loadMore();
  };
  useEffect(() => {}, [productData]);
  const [loadMoreLoader, setLoadMoreLoader] = useState<boolean>(false);
  const trendingProductsLoader = useSelector(
    (state: any) => state.products.tpIsLoading
  );
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <>
        <HeaderFilterSection
          categories={productData.trending_categories}
          handleSelectedCategories={handleSelectedCategories}
        />

        {trendingProductsLoader === true && loadMoreLoader === false ? (
          <div className="flex justify-center mt-5 mb-5">
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
        ) : (
          <>
            <div
              className={`grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 `}
            >
              {productData?.products?.map((item: any, index: number) => (
                // <ProductCard data={item} key={index} />
                <ProductCard
                  product={item}
                  key={item?.product_info?.id}
                  productData={item?.product_info}
                  productVarients={
                    item?.product_variants?.length > 0
                      ? item?.variants_parent_child_relation
                      : []
                  }
                />
              ))}
            </div>
            {productData?.products?.length === 0 &&
              trendingProductsLoader === false && (
                <div style={{ marginTop: "5%", marginBottom: "10%" }}>
                  <center>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        color: "#c5c5c5",
                      }}
                    >
                      <img
                        style={{
                          marginBottom: "1rem",
                        }}
                        src={noproduct}
                        alt="no_products_found"
                        className="colorized w-20 lg:w-50"
                      />
                      No Products Found
                    </p>
                  </center>
                </div>
              )}
            {(showSeeMore === true || trendingProductsLoader === true) && (
              <div className="flex mt-16 justify-center items-center">
                <ButtonPrimary
                  loading={trendingProductsLoader === true ? true : false}
                  disabled={trendingProductsLoader === true ? true : false}
                  onClick={() => {
                    setLoadMoreLoader(true);
                    handlePagination();
                  }}
                >
                  Show me more
                </ButtonPrimary>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SectionGridFeatureItems;
