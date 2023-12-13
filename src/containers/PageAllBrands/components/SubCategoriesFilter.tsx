import React, { FC, useEffect } from "react";
import Heading from "shared/Heading/Heading";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import TabFilters from "components/TabFilters";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

export interface HeaderFilterSectionProps {
  className?: string;
  sub_categories?: any;
  tabActive?: any;
  setTabActive?: any;
}

const SubCategoriesFilter: FC<HeaderFilterSectionProps> = ({
  className = "mb-12",
  sub_categories = [],
  tabActive = "",
  setTabActive,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    // console.log("CATEGORIES: ", sub_categories);
    // console.log("TAB ACTIVE: ", tabActive);
  }, [tabActive]);

  const searchBrandsLoading = useSelector(
    (state: any) => state?.SearchAllBrands?.searchBrandsIsLoading
  );

  return (
    <div className={`flex flex-col relative ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {sub_categories &&
            sub_categories?.map((item: any, index: any) => (
              <NavItem
                disabled={searchBrandsLoading === true ? true : false}
                className="px-4 py-2"
                key={index}
                isActive={tabActive === item}
                onClick={() => setTabActive(item)}
              >
                {item === "" ? "ALL" : item}
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

export default SubCategoriesFilter;
