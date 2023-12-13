import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.svg";
import logoLightImg from "images/QP White.png";
import { useDispatch, useSelector } from "react-redux";
import logoDarkImg from "images/QP Black.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  imgDark?: string;
  className?: string;
  imgHeightGeneral?: string;
  imgHeightSM?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  imgDark = logoDarkImg,
  className = "flex-shrink-0",
  imgHeightGeneral = "max-h-8",
  imgHeightSM = "max-h-10",
}) => {
  const mallLogo = useSelector((state: any) => state.token.mallLogo);

  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block ${imgHeightGeneral} sm:${imgHeightSM} ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={mallLogo}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden ${imgHeightGeneral} sm:${imgHeightSM} dark:block"
          src={mallLogo}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;
