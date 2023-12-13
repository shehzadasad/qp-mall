import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";

import DropdownCategories from "./DropdownCategories";

import { useSelector } from "react-redux";
import close from "../../images/close.svg";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoIosClose } from "react-icons/io";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [category, setCategory] = useState<any>("");
  const history = useHistory();

  const navBar = useSelector(
    (state: any) => state?.NavBar?.data?.data?.announcement_bar
  );
  const keywords = useSelector(
    (state: any) => state.NavBar?.data?.data?.top_searched_keywords
  );
  const [SearchParams, setSearchParams] = useState("");

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
  const searchKeyWord = (keyword: String) => {
    if (typeof keyword === "string") {
      const base64Param = btoa(keyword);
      const base64Category = btoa("All Categories");

      const searchQuery = `search=${base64Param}`;
      const categoryQuery = `category=${base64Category}`;

      history.push(`/search?${searchQuery}&${categoryQuery}`);
    }
  };

  const [openFilterCategory, setOpenFilterCategory] = useState(false);
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
      <>
        <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900">
          <div className="flex w-[250%] 2xl:w-[270%] ml-[-20%]">
            <div className="h-20 flex justify-between">
              <div className="flex items-center md:hidden flex-1 ">
                <MenuBar />
              </div>
              <div className="flex lg:flex-0 items-center space-x-3 sm:space-x-8 ">
                {/* <Logo /> */}

                {/* {!showSearchForm && (
                  <div className="hidden md:block h-10 w-[45vw]">
                    {renderSearchForm()} 
                  </div>
                )}  */}

                <form className="hidden lg:block" onSubmit={handleSubmit}>
                  <div className="flex w-[250%] 2xl:w-[270%]">
                    <label
                      // for="search-dropdown"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Your Email
                    </label>

                    <div
                      className=" flex-shrink-0 px-2 inline-flex items-center bg-[#F7F9FC]    rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none "
                      onClick={() => handleFilter()}
                    >
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
                          className="top-0 left-0 p-2.5 text-sm font-medium bg-[#F7F9FC]"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 28 28"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
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
                            onClick={() => setSearchParams("")}
                          >
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
                {/* <AvatarDropdown />
                <CartDropdown /> */}
                {/* <MenuBar /> */}
              </div>
            </div>
            {!showSearchForm && (
              <div className="md:hidden ">{renderSearchForm()}</div>
            )}
            <div className="flex lg:flex-1 items-center space-x-3 mt-[10px] md:mt-[2px] mb-[2px]  sm:space-x-8 ">
              {/* <div className="ml-10"></div> */}
              {/* <div className="keywords">
                <div className="flex flex-wrap px-2 md:ml-40 text-slate-600">
                  {keywords?.map((keyword: String, index: number) => {
                    return (
                      <div
                        key={uuidv4()}
                        onClick={() => searchKeyWord(keyword)}
                        className={`${
                          keywords.length !== index + 1 && "border-r"
                        } border-slate-300 dark:border-slate-700 p-1 px-3 text-xs`}
                      >
                        {keyword}
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="h-20 flex justify-between">
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div>

          <div className="lg:flex-1 flex items-center">
            <Logo className="flex-shrink-0" />
          </div>

          <div className="flex-[2] hidden lg:flex justify-center mx-4">
            {showSearchForm ? renderSearchForm() : <Navigation />}
          </div>

          <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
            {!showSearchForm && (
              <button
                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                onClick={() => setShowSearchForm(!showSearchForm)}
              >
                {renderMagnifyingGlassIcon()}
              </button>
            )}
            <AvatarDropdown />
            <CartDropdown />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
