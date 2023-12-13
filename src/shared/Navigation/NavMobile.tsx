import React, { useEffect, useState } from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
// import { NAVIGATION_DEMO_2 } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import close from "../../images/close.svg";

export interface NavMobileProps {
  // data?: NavItemType[];
  onClickClose?: () => void;
  setIsVisable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMobile: React.FC<NavMobileProps> = ({
  // data = NAVIGATION_DEMO_2,
  onClickClose,
  setIsVisable,
}: NavMobileProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginToken = useSelector((state: any) => state.token.loginToken);
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);
  const [SearchParams, setSearchParams] = useState("");
  const [category, setCategory] = useState<any>("");

  const handleSubmit = (event: any) => {
    if (SearchParams === "") {
      event.preventDefault();
    } else {
      const base64Param = btoa(SearchParams);
      const base64Category = btoa(
        category === "" ? "All Categories" : category
      );

      const searchQuery = `search=${base64Param}`;
      const categoryQuery = `category=${base64Category}`;

      history.push(`/search?${searchQuery}&${categoryQuery}`);
    }
  };

  let base64Id: string;
  const handleSubmitBase64 = (category_name: string, category_id: string) => {
    base64Id = btoa(category_name);
    history.push(`/categories/${base64Id}`, { categoryId: category_id });
    setIsVisable && setIsVisable(false);
  };

  const _renderMenuChild = (
    item: any,
    itemClass = " pl-3 text-neutral-900 dark:text-n utral-200 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item?.sub_categories?.map((i: any, index: any) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              exact
              strict
              to={{
                pathname: i.href || undefined,
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
              activeClassName="text-secondary"
            >
              <span
                className={`py-2.5 ${!i.sub_categories ? "block w-full" : ""}`}
                onClick={() =>
                  handleSubmitBase64(item.category_name, item.category_id)
                }
              >
                {i.sub_category_name}
              </span>
              {i.sub_categories && (
                <span
                  className="flex items-center flex-grow"
                  // onClick={handleSubmitBase64}
                >
                  {/* <Disclosure.Buttonconst 
                    as="span" 
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-slate-500"
                      aria-hidden="true"
                    /> 
                  </Disclosure.Buttonconst> */}
                </span>
              )}
            </NavLink>
            {i.sub_categories && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i,
                  "pl-3 text-slate-600 dark:text-slate-400 "
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: any, index: number) => {
    return (
      <Disclosure
        key={index}
        as="li"
        className="text-slate-900 dark:text-white"
      >
        <NavLink
          exact
          strict
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          to={{
            pathname: item.href || undefined,
          }}
          activeClassName="text-secondary"
        >
          <span
            className={!item.sub_categories ? "block w-full" : ""}
            onClick={() =>
              handleSubmitBase64(item.category_name, item.category_id)
            }
          >
            {item.category_name}
          </span>
          {item.sub_categories.length > 0 && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                {/* <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                /> */}
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.sub_categories && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 text-slate-900 dark:text-slate-200"
        onSubmit={handleSubmit}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
            value={SearchParams}
            onChange={(e: any) => {
              setSearchParams(e.target.value);
            }}
          />
          {SearchParams !== "" && (
            <button
              type="button"
              className="absolute z-50 top-0 right-0 p-2.5 text-sm font-medium text-white bg-[#F7F9FC] rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setSearchParams("")}
            >
              <img src={close} alt="Close" style={{ cursor: "pointer" }} />
            </button>
          )}
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
            <span className="block">
              {/* <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" /> */}
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <div className="mt-5">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {navBar?.map(_renderItem)}
      </ul>
      {/* <div className="flex items-center justify-between py-6 px-5 space-x-2">
        <ButtonPrimary href={"/"} className="!px-10">
          Buy this template
        </ButtonPrimary>
      </div> */}
    </div>
  );
};

export default NavMobile;
