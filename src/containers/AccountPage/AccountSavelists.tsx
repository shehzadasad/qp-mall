import React, { useEffect, useState } from "react";
import ProductCard from "components/ProductCard";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { fetchFavourites } from "redux/Favourites/Favourites";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

const AccountSavelists = () => {
  const dispatch = useDispatch();
  const SHOW_PER_PAGE = 4;
  const [visible, setVisible] = useState(SHOW_PER_PAGE);
  const loadMore = () => {
    setVisible((current) => current + SHOW_PER_PAGE);

    if (favourtiesData.length < visible + SHOW_PER_PAGE)
      toast("No more products found.", {
        icon: "📦",
      });
  };

  const loginToken = useSelector((state: any) => state.token.loginToken);
  const favourtiesData = useSelector((state: any) => state.Favourites.favs);
  const isLoadingPostFav = useSelector(
    (state: any) => state.Favourites.isLoadingPostFav
  );
  const fetchAllFavs = () => {
    dispatch(fetchFavourites({ loginToken: loginToken }));
  };

  useEffect(() => {
    fetchAllFavs();
  }, [loginToken, isLoadingPostFav]);

  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of saved products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {favourtiesData.slice(0, visible)?.map((item: any) => (
            <ProductCard
              product={item}
              productData={item.product_info}
              productVarients={
                item.product_variants.length > 0
                  ? item.variants_parent_child_relation
                  : []
              }
              key={uuidv4()}
              likeItem={item.is_liked}
            />
          ))}
        </div>
        {favourtiesData.length >= visible && (
          <div className="flex !mt-20 justify-center items-center">
            <ButtonSecondary onClick={() => loadMore()}>
              Show me more
            </ButtonSecondary>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {favourtiesData.length > 0 ? (
        <CommonLayout>{renderSection1()}</CommonLayout>
      ) : (
        <CommonLayout>
          <h2 className="text-2xl sm:text-3xl font-semibold">No items Added</h2>
        </CommonLayout>
      )}
    </div>
  );
};

export default AccountSavelists;
