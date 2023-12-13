import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import DropdownCategories from "./DropdownCategories";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import close from "../../images/close.svg";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoIosClose } from "react-icons/io";
export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [category, setCategory] = useState<any>("");
  const history = useHistory();
  const [SearchParams, setSearchParams] = useState("");
  const handleSubmit = (event: any) => {
    if (SearchParams === "" || SearchParams.length < 3) {
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

  const searchKeyWord = (keyword: String) => {
    if (typeof keyword === "string") {
      const base64Param = btoa(keyword);
      const base64Category = btoa("All Categories");

      const searchQuery = `search=${base64Param}`;
      const categoryQuery = `category=${base64Category}`;

      history.push(`/search?${searchQuery}&${categoryQuery}`);
    }
  };

  const [showSearchForm, setShowSearchForm] = useState(false);
  const [openFilterCategory, setOpenFilterCategory] = useState(false);
  const navBar = useSelector(
    (state: any) => state?.NavBar?.data?.data?.announcement_bar
  );
  const categoryData = useSelector(
    (state: any) => state.NavBar?.data?.data?.navbar
  );
  const keywords = useSelector(
    (state: any) => state.NavBar?.data?.data?.top_searched_keywords
  );

  const handleFilter = () => {
    setOpenFilterCategory(!openFilterCategory);
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
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
        className="flex-1  text-slate-900 dark:text-slate-100"
        onSubmit={handleSubmit}>
        <div
          style={{ width: "100%" }}
          className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 pr-2 lg:px-5 h-full w-full rounded">
          <div
            className="flex-shrink-0 px-1 inline-flex items-center bg-[#F7F9FC]    rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none "
            // onClick={() => handleFilter()}
          >
            <DropdownCategories
              mobile={true}
              allCategories={true}
              title={
                category === ""
                  ? "All Categories"
                  : category.length > 10
                  ? category.slice(0, 13) + "..."
                  : category
              }
              setCategory={setCategory}
            />
          </div>
          {renderMagnifyingGlassIcon()}
          <input
            placeholder="Type and press enter"
            className="border-none bg-transparent pl-1 pr-0 focus:outline-none focus:ring-0 w-full text-base"
            required
            value={SearchParams}
            onChange={(e: any) => setSearchParams(e.target.value)}
          />
          <button type="button" onClick={() => setSearchParams("")}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };
  let base64_Products: string;
  const handleShopNow = () => {
    base64_Products = btoa("Flash Sale");

    history.push(`/product/${base64_Products}`);
  };
  return (
    <>
      <div className=" bg-orange-200 z-50 w-full px-5 py-2 lg:flex flex-row gap-12 justify-center hidden ">
        {/* <div className="text-2xl font-semibold text-orange-800"> */}
        <div className="topBanner">
          {navBar?.map((item: any) => item.text.String)}
        </div>
        <div className="topBanner">Up to 60% off</div>
        <button
          className="topBanner border border-[#9a3412] rounded-lg px-[12px] py-[2px] "
          onClick={() => handleShopNow()}
          disabled>
          Shop now
        </button>
      </div>

      <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="h-20 flex justify-between">
            <div className="flex items-center md:hidden flex-1 ">
              <MenuBar />
            </div>
            <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8 ">
              <Logo />

              {/* {!showSearchForm && (
                  <div className="hidden md:block h-10 w-[45vw]">
                    {renderSearchForm()} 
                  </div>
                )}  */}

              <form className="hidden lg:block" onSubmit={handleSubmit}>
                <div className="flex w-[250%] 2xl:w-[270%]">
                  <label
                    // for="search-dropdown"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Your Email
                  </label>

                  <div
                    className=" flex-shrink-0 px-2 inline-flex items-center bg-[#F7F9FC]    rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none "
                    onClick={() => handleFilter()}>
                    <DropdownCategories
                      allCategories={true}
                      title={
                        category === ""
                          ? "All Categories"
                          : category.length > 10
                          ? category.slice(0, 13) + "..."
                          : category
                      }
                      setCategory={setCategory}
                    />
                  </div>

                  {/* {openFilterCategory && (
                      <div className="absolute top-16    bg-white divide-y divide-gray-100 rounded-lg shadow p-4 dark:bg-gray-700">
                        <ul
                          className="py-2 text-sm text-gray-700  "
                          aria-labelledby="dropdown-button">
                          {categoryData.map((cat: any) => {
                            return <li className="py-[6px] cursor-pointer hover:bg-[#FAFAFA]">{cat.category_name} </li>;
                          })}
                        </ul>
                        
                      </div>
                    )} */}

                  <div className="relative w-full">
                    <div className="flex relative">
                      <button
                        type="submit"
                        className="top-0 left-0 p-2.5 text-sm font-medium bg-[#F7F9FC]">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 28 28"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </button>
                      <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-xs text-gray-900 bg-gray-50 rounded-r-lg border-none focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Type and press enter"
                        required
                        value={SearchParams}
                        onChange={(e: any) => {
                          setSearchParams(e.target.value);
                        }}
                      />
                      {SearchParams !== "" && (
                        <button
                          type="button"
                          className="absolute z-50 top-0 right-0 h-full px-2  cursor-pointer text-sm font-medium text-black bg-[#F7F9FC] rounded-r-lg hover:bg-[#358BEE] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => setSearchParams("")}>
                          <IoIosClose size={25} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className=" flex-1 flex items-center justify-end ">
              {/* {!showSearchForm && (
                <div className="hidden md:block mr-8">
                  <DropdownCategories title={"Shops"} footer={true} />
                </div>
              )} */}
              <AvatarDropdown />
              <CartDropdown />
              {/* <MenuBar /> */}
            </div>
          </div>
          {!showSearchForm && (
            <div className="md:hidden ">{renderSearchForm()}</div>
          )}
          <div className="flex lg:flex-1 items-center space-x-3 mt-[10px] md:mt-[2px] mb-[2px]  sm:space-x-8 ">
            {/* <div className="ml-10"></div> */}
            <div className="keywords">
              <div className="flex flex-wrap px-2 md:ml-40 text-slate-600">
                {keywords?.map((keyword: String, index: number) => {
                  return (
                    <div
                      key={uuidv4()}
                      onClick={() => searchKeyWord(keyword)}
                      className={`${
                        keywords.length !== index + 1 && "border-r"
                      } border-slate-300 dark:border-slate-700 p-1 px-3 text-xs cursor-pointer`}>
                      <span style={{ cursor: "pointer" }}>{keyword}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav2;
