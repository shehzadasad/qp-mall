import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavItems } from "redux/HomePage/NavBarItemsApi";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React from "react";

import "../../App.css";

export default function DropdownCategories(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);

  // const fetchNavItem = () => {
  //   dispatch(fetchNavItems({ loginToken: loginToken }));
  // };

  // React.useEffect(() => {
  //   if (loginToken) fetchNavItem();
  // }, [dispatch, loginToken]);

  let base64Id: string;
  const handleSubmitBase64 = (category_name: string, category_id: string) => {
    base64Id = btoa(category_id);
    history.push(`/categories/${base64Id}`);
  };
  const handleSearch = (name: String) => {
    props.setCategory(name);
  };

  return (
    <div className="DropdownCategories">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${open ? "" : "text-opacity-90"} ${
                props.mobile && props.mobile === true && "w-24"
              }
                group py-2 h-10 sm:h-10 flex items-center rounded-md text-sm sm:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0 `}
            >
              <span className="truncate">{props.title}</span>
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70 "}
                  ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 `}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute z-40 w-80 mt-3.5 transform -translate-x-1/2 left-1/2 sm:px-0"
                style={{
                  marginLeft: `${
                    props.mobile && props.mobile === true && "112%"
                  }`,
                }}
              >
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-5 bg-white dark:bg-neutral-800 p-7 h-80 overflow-auto">
                    {props.allCategories && (
                      <div style={{ cursor: "pointer" }}>
                        <div className="ml-4 space-y-0.5">
                          <p
                            onClick={() => {
                              handleSearch("All Categories");
                              close();
                            }}
                            key={uuidv4()}
                            className="text-sm font-medium "
                          >
                            All Categories
                          </p>
                        </div>
                      </div>
                    )}
                    {navBar?.map((item: any, index: any) => (
                      <div style={{ cursor: "pointer" }}>
                        {/* <div 
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-primary-50 rounded-md text-primary-500 sm:h-12 sm:w-12"
                        ></div> */}
                        <div className="ml-4 space-y-0.5">
                          <p
                            onClick={() => {
                              props.title === "Shops"
                                ? handleSubmitBase64(
                                    item.category_name,
                                    item.category_id
                                  )
                                : handleSearch(item.category_name);
                              close();
                            }}
                            key={uuidv4()}
                            className="text-sm font-medium "
                          >
                            {item.category_name}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-300">
                            {/* {item.description} */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* FOOTER */}
                  {props.footer && (
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-700">
                      <Link
                        to="/categories"
                        className="flow-root px-2 py-2 space-y-0.5 transition duration-150 ease-in-out rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center">
                          <span className="text-sm font-medium ">
                            Go to our shop
                          </span>
                        </div>
                        <span className="block text-sm text-slate-500 dark:text-neutral-400">
                          Look for what you need and love.
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
