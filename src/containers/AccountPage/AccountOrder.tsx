import React, { useEffect, useState } from "react";
import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "redux/Orders/GetOrderList";
import moment from "moment";
import ReviewModal from "./ReviewModal";

const AccountOrder = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderslength, setOrdersLength] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [visible, setVisible] = useState(999999999999);
  const [offset, setOffset] = useState(1);
  const ordersData = useSelector((state: any) => state.Orders.orders);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const isLoadingReview = useSelector(
    (state: any) => state.Review.isLoadingReview
  );
  console.log(isLoadingReview);
  const loadMore = () => {
    setVisible(visible + 4);
    // setOffset(offset + 1);
    setOrdersLength(ordersData.length);
  };
  const fetchAllOrders = () => {
    dispatch(fetchOrders({ loginToken: loginToken, visible, offset }));
  };
  useEffect(() => {
    fetchAllOrders();
  }, [dispatch, visible, offset, isLoadingReview]);

  useEffect(() => {
    if (orderslength === ordersData?.length) {
      setNoMoreData(true);
    }
  }, [ordersData]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleShowOrder = (index: number) => {
    if (index === currentIndex) {
      setShowDetail(!showDetail);
    } else {
      setCurrentIndex(index);
      setShowDetail(true);
    }
  };

  return (
    <div className="">
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
          {ordersData?.map((order: any, index: number) => {
            return (
              <div
                key={order.order_id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                  <div>
                    <p
                      title={order.order_number}
                      className="text-lg font-semibold truncate"
                    >
                      #{order.order_number}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                      <span>
                        {moment()
                          .month(order.date_time.month - 1)
                          .format("MMMM")}{" "}
                        {order.date_time.day}, {order.date_time.year}
                      </span>
                      <span className="mx-2">·</span>
                      <span className="text-primary-500">{order.status}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                      No of Products: {order.order_details.order_items.length}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                      Amount: {order?.local_amount} {order?.local_currency}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2 w-[60%]">
                      Billing Adlress:{" "}
                      {order?.customer_order_details?.billing_address}{" "}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2 w-[60%]">
                      Shipping Address:{" "}
                      {order?.customer_order_details?.shipping_address}{" "}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <ButtonSecondary
                      sizeClass="py-2.5 px-4 sm:px-6 w-[8rem]"
                      fontSize="text-sm font-medium"
                      onClick={() => handleShowOrder(index)}
                    >
                      View Order
                    </ButtonSecondary>
                  </div>
                </div>
                {showDetail && currentIndex === index && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-4 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                    {order.order_details.order_items.map((details: any) => {
                      return (
                        <div
                          key={1}
                          className="flex py-4 sm:py-7 last:pb-0 first:pt-0"
                        >
                          <div className="h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={details?.image_url}
                              alt={"image"}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between ">
                                <div>
                                  <h3 className="text-base font-medium line-clamp-1">
                                    {details?.name}
                                  </h3>
                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{details.metadata.colour}</span>
                                    <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                    <span>{details.metadata.size}</span>
                                  </p>
                                </div>
                                <Prices
                                  className="mt-0.5 ml-2"
                                  price={details.unit_amount}
                                />
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500 dark:text-slate-400 flex items-center">
                                <span className="hidden sm:inline-block">
                                  Qty
                                </span>
                                <span className="inline-block sm:hidden">
                                  x
                                </span>
                                <span className="ml-2">
                                  {details?.quantity}
                                </span>
                              </p>

                              <div className="flex">
                                {order.status === "COMPLETED" ? (
                                  <>
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 dark:text-primary-500 "
                                      onClick={() =>
                                        details.already_reviewed === false &&
                                        setShowModal(true)
                                      }
                                    >
                                      {details.already_reviewed
                                        ? "Review posted"
                                        : "Leave review"}
                                    </button>
                                    {showModal ? (
                                      <>
                                        <ReviewModal
                                          closeModal={closeModal}
                                          id={details.product_id}
                                        />
                                      </>
                                    ) : null}
                                  </>
                                ) : (
                                  <small>
                                    Your order is{" "}
                                    <span className="font-bold">
                                      {order.status}
                                    </span>
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {ordersData?.length > visible && (
            <div className="flex !mt-20 justify-center items-center">
              <ButtonSecondary onClick={() => loadMore()}>
                Show me more
              </ButtonSecondary>
            </div>
          )}
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountOrder;
