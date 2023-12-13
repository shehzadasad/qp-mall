import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";
import pci1 from "../../images/pci1.svg";
import EP from "../../images/EP.svg";
import COD from "../../images/COD.svg";
import visa from "../../images/visa.svg";
import jaazcash from "../../images/jaazcash.svg";
import mastercard1 from "../../images/mastercard1.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "#", label: "Release Notes" },
      { href: "#", label: "Upgrade Guide" },
      { href: "#", label: "Browser Support" },
      { href: "#", label: "Dark Mode" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Prototyping" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "#", label: "Best practices" },
      { href: "#", label: "Support" },
      { href: "#", label: "Developers" },
      { href: "#", label: "Learn design" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "#", label: "Discussion Forums" },
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Contributing" },
      { href: "#", label: "API Reference" },
    ],
  },
];

const Footer: React.FC = () => {
  const history = useHistory();
  const navBar = useSelector((state: any) => state.NavBar?.data?.data?.navbar);

  let base64Id: string;
  let base64Id_subCategories: string;
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
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu?.menus?.map((item, index) => (
            <li key={uuidv4()}>
              <a
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-10 border-t border-neutral-200 dark:border-neutral-700 ">
      {/* <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-3 md:col-span-1">
           
            
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus?.map(renderWidgetMenuItem)}
      </div> */}
      {/* <div className="container sm:flex flex-row gap-20 lg:mt-5 mt-10 lg:mt-0">
        <div className="">
          <div className="text-sm">Payment Methods</div>
          <div className="flex flex-row gap-1 mt-3.5">
            <img src={COD} alt="" />
            <img src={visa} alt="" />
            <img src={mastercard1} alt="" />
          </div>
        </div>
        
      </div> */}

      <div className="w-full px-5 sm:px-10">
        <div className="block sm:hidden">
          <Logo
            imgHeightGeneral={"max-h-12 w-auto max-w-fit"}
            imgHeightSM={"max-h-16"}
          />
          <div className="text-sm" style={{ color: "#5C6481" }}>
            &copy; QisstpayMall 2023
          </div>
          <div className="mt-10">
            <div className="text-sm font-semibold">Verified by</div>
            <div className="mt-3.5">
              <img src={pci1} alt="" />
            </div>
          </div>
        </div>
        <div className="hidden sm:flex justify-between">
          <Logo
            imgHeightGeneral={"max-h-12 w-auto max-w-fit"}
            imgHeightSM={"max-h-16"}
          />
          <div className="mr-5 mt-3">
            <div className="flex text-sm font-semibold">
              Verified by
              <span className="ml-2">
                <img src={pci1} alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block mt-2">
          <div className="text-sm" style={{ color: "#5C6481" }}>
            &copy; QisstpayMall 2023
          </div>
        </div>
      </div>

      <div className="w-full flex mt-10 lg:mb-5 px-5 sm:pb-0 sm:px-10">
        <div className="flex justify-start" style={{ display: "block" }}>
          {navBar?.map((data: any) => {
            return (
              <p
                key={data.category_id}
                className="text-xs font-semibold mt-4 mb-2 cursor-pointer"
              >
                <span
                  onClick={() =>
                    handleSubmitBase64(data.category_name, data.category_id)
                  }
                >
                  {data?.category_name}:
                </span>
                {data?.sub_categories?.map((sub: any) => {
                  return (
                    <span
                      key={uuidv4()}
                      onClick={() =>
                        handleSubmitBase64SubCategories(
                          data.category_name,
                          data.category_id,
                          sub.sub_category_id,
                          sub.sub_category_name
                        )
                      }
                      className="text-xs font-normal text-slate-600 ml-2 mt-1"
                    >
                      {sub.sub_category_name} |
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>

        {/* <div>
          Air Conditioners | Audios & Theaters | Car Electronics | Office
          Electronics | TV Televisions | Washing Machines
        </div> */}
      </div>

      {/* <div
        // style={{ backgroundColor: "yellow" }}
        className="bg-slate-100 absolute inset-x-0 bottom-0 h-30 hidden lg:flex items-center justify-center flex-row mt-8"
      >
        <div className="flex flex-row gap-8 items-center justify-center pb-4 text-gray-500 text-sm font-normal mt-2 px-3 my-8 pt-3">
          <a href="#">JOMO Style Bazar</a>
          <a href="#">Blogs</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Returns & Exchange Policy</a>
          <a href="#">Refund Policy</a>
          <a href="#">Shipping Policy</a>
          <a href="#">FAQ's</a>
          <a href="#">Contact Us</a>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-3 text-gray-100 text-xs font-medium flex justify-left pb-6 pt-2"
          style={{ backgroundColor: "#404040" }}
        >
          <p style={{ marginLeft: "10%" }}>
            &copy; 2021 Ecoshop. All rights reserved.
          </p>
        </div>
      </div> */}
      {/* <div
        className="lg:hidden bottom-0 inset-x-0 absolute"
        style={{ backgroundColor: "#404040" }}
      >
        <hr />
        <div
          className="flex justify-center items-center py-3 text-xs"
          style={{ color: "white" }}
        >
          © 2021 Ecoshop. All rights reserved.
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
