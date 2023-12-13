import React from "react";
// import icon from "images/icon.svg";
import delivery from "../../images/delivery.svg";
// import delivery from "images/delivery.svg";
import payment from "images/payment.svg";
import returns from "images/returns.svg";
import support from "images/support.svg";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import "../../App.css";

const Features = () => {
  return (
    <>
      <div className="lg:grid gap-2 grid-cols-2">
        <div className="lg:grid gap-2 grid-cols-2 mt-10">
          <div className="flex items-center  my-8 border:none md:border-r-2 border-gray-100 border-solid border-b-0 border-t-0 border-l-0 h-20">
            <div>
              <img className="delivery" src={delivery} alt="" />
            </div>
            <div className="p-3 ">
              <div className="text-xl font-bold">Free Delivery</div>
              <div className="text-base">For all orders over $99</div>
            </div>
          </div>
          <div className="flex items-center  my-8 border-solid border-b-0 border-t-0 border-l-0 h-20">
            <div>
              <img src={returns} alt="" />
            </div>
            <div className="p-3">
              <div className="text-xl font-bold">90 Days Return</div>
              <div className="text-base">If goods have problems</div>
            </div>
          </div>
          <div className="flex items-center  my-8 border:none md:border-r-2 border-gray-100 border-solid border-b-0 border-t-0 border-l-0 h-20">
            <div>
              <img src={payment} alt="" />
            </div>
            <div className="p-3">
              <div className="text-xl font-bold">Secure Payment</div>
              <div className="text-base">100% secure payment</div>
            </div>
          </div>
          <div className=" flex items-center  my-8 border-solid border-b-0 border-t-0 border-l-0 h-20">
            <div>
              <img src={support} alt="" />
            </div>
            <div className="p-3 ">
              <div className="text-xl font-bold">24/7 Support</div>
              <div className="text-base">Dedicated Support</div>
            </div>
          </div>
        </div>
        <div>
          {/* lg:w-[50%] */}
          <div className="max-w-lg relative bg-slate-50 p-10">
            <h2 className="font-semibold text-2xl md:text-4xl">
              Don't miss out on special offers
            </h2>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Register to receive news about the latest, savings combos,
              discount codes...
            </span>
            <ul className="space-y-4 mt-10">
              <li className="flex items-center space-x-4">
                <Badge color="purple" name="01" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Savings combos
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Badge name="02" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Freeship
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Badge color="red" name="03" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Premium magazines
                </span>
              </li>
            </ul>
            <form className="mt-10 relative max-w-sm">
              <Input
                required
                aria-required
                placeholder="Enter your email"
                type="email"
                rounded="rounded-full"
                className="focus:ring-primary-500"
              />
              <ButtonCircle
                type="submit"
                className="absolute transform top-1/2 -translate-y-1/2 right-1"
              >
                <ArrowSmallRightIcon className="w-6 h-6" />
              </ButtonCircle>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
