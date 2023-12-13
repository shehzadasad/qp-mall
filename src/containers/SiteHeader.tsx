import React from "react";
import { useLocation } from "react-router-dom";
import HeaderLogged from "components/Header/HeaderLogged";
import Header from "components/Header/Header";
import MainNav2 from "components/Header/MainNav2";

const SiteHeader = () => {
  let location = useLocation();

  return location.pathname === "/" ||
    location.pathname === "/brands" ||
    location.pathname === "/brand/:id" ||
    location.pathname === "/brands/:name" ? (
    <Header />
  ) : (
    <HeaderLogged />
  );
};

export default SiteHeader;
