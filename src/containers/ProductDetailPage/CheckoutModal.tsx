import React, { useState, useRef, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import close from "../../images/close.svg";

const CheckoutModal = (props: any) => {
  const handleClose = () => {
    props.closeModal();
  };

  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }
  return (
    <div className="fixed inset-0 bg-opacity-25 bg-gray-900 backdrop-blur-sm flex items-center justify-center overflow-x-hidden overflow-y-hidden z-40 top-0 left-0 w-full h-full outline-none  ">
      <div
        className="bg-white p-2 rounded-2xl  md:w-[60%] lg:w-[40%] overflow-y-hidden p-[30px]"
        style={{ height: "90vh" }}
      >
        <div className="flex justify-end ">
          <div onClick={() => handleClose()}>
            <img src={close} alt="" style={{ cursor: "pointer" }} />
          </div>
        </div>
        {isLoading && (
          <div
            style={{
              marginTop: "150pt",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            {/* Loader */}
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#cbe5f7", "#0DA5E9", "#cbe5f7", "#0DA5E9", "#cbe5f7"]}
            />
          </div>
        )}
        <iframe
          src={props.url.checkout_url}
          style={{
            height: "100%",
            width: "100%",
            visibility: isLoading ? "hidden" : "visible",
          }}
          onLoad={handleLoad}
        ></iframe>
      </div>
    </div>
  );
};

export default CheckoutModal;
