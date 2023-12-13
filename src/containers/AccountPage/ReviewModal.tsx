import React, { useState, useRef, useEffect } from "react";
import close from "../../images/close.svg";
import star from "../../images/star.svg";
import camera from "../../images/review/camera.svg";
import grayStar from "../../images/review/grayStar.svg";
import { addReviewData } from "redux/Review/AddReview";
import { useDispatch, useSelector } from "react-redux";
export interface myInterface {
  lastModified: any;
  lastModifiedDate: any;
  name: string;
  size: any;
  type: any;
  webkitRelativePath: any;
}
interface FormValues {
  formValue?: string;
}

const ReviewModal = (props: any) => {
  const dispatch = useDispatch();
  const [filebase64, setFileBase64] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState("");
  const [rating, setRating] = useState({ isRated: false, rateNum: 0 });
  const [formValueImage, setFormValueImage] = useState<any>(null);
  const inputElement = useRef(null);
  const loginToken = useSelector((state: any) => state.token.loginToken);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: any) => {
    let files = event.target.files;
    if (inputRef.current) {
      inputRef.current.click();
    }

    const fileRef = files[0] || "";
    const fileType: string = fileRef.type || "";

    const reader = new FileReader();
    reader.readAsBinaryString(fileRef);
    reader.onload = (ev: any) => {
      // convert it to base64
      setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
    };
  };

  const handleChangeText = (e: any) => {
    setDescriptionText(e.target.value);
  };
  const handleRating = (num: number) => {
    setRating({ isRated: true, rateNum: num });
  };

  const handleClose = () => {
    props.closeModal();
  };

  const submitReview = () => {
    const payload = {
      image: filebase64,
      text: descriptionText,
      product_id: props.id,
      rating: rating.rateNum,
    };
    dispatch(
      addReviewData({
        loginToken: loginToken,
        payload: payload,
        handleClose: handleClose,
      })
    );
  };

  return (
    <div className="fixed inset-0  bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-x-hidden overflow-y-auto   z-40 top-0 left-0 w-full h-full outline-none  ">
      <div
        className="bg-white p-2 rounded-2xl  md:w-[60%] lg:w-[35%] overflow-y-scroll p-[30px]"
        style={{ maxHeight: "90vh" }}>
        <div className="flex justify-between ">
          <div className="text-2xl font-bold">Leave Review</div>
          <div onClick={() => handleClose()}>
            <img src={close} alt="" style={{ cursor: "pointer" }} />
          </div>
        </div>

        <div className="flex mt-7">
          {rating.isRated &&
          (rating.rateNum === 1 ||
            rating.rateNum === 2 ||
            rating.rateNum === 3 ||
            rating.rateNum === 4 ||
            rating.rateNum === 5) ? (
            <img
              src={star}
              alt=""
              className="mx-[4px] cursor-pointer"
              onClick={() => handleRating(1)}
            />
          ) : (
            <img
              src={grayStar}
              alt=""
              className="mx-[4px] cursor-pointer "
              onClick={() => handleRating(1)}
            />
          )}

          {rating.isRated &&
          (rating.rateNum === 2 ||
            rating.rateNum === 3 ||
            rating.rateNum === 4 ||
            rating.rateNum === 5) ? (
            <img
              src={star}
              alt="star"
              className="mx-[4px] cursor-pointer"
              onClick={() => handleRating(2)}
            />
          ) : (
            <img
              src={grayStar}
              alt="star"
              className="mx-[4px]"
              onClick={() => handleRating(2)}
            />
          )}
          {rating.isRated &&
          (rating.rateNum === 3 ||
            rating.rateNum === 4 ||
            rating.rateNum === 5) ? (
            <img
              src={star}
              alt="star"
              className="mx-[4px] cursor-pointer"
              onClick={() => handleRating(3)}
            />
          ) : (
            <img
              src={grayStar}
              alt="star"
              className="mx-[4px]"
              onClick={() => handleRating(3)}
            />
          )}
          {rating.isRated && (rating.rateNum === 4 || rating.rateNum === 5) ? (
            <img
              src={star}
              alt="star"
              className="mx-[4px] cursor-pointer"
              onClick={() => handleRating(4)}
            />
          ) : (
            <img
              src={grayStar}
              alt="star"
              className="mx-[4px]"
              onClick={() => handleRating(4)}
            />
          )}
          {rating.isRated && rating.rateNum === 5 ? (
            <img
              src={star}
              alt="star"
              className="mx-[4px] cursor-pointer"
              onClick={() => handleRating(5)}
            />
          ) : (
            <img
              src={grayStar}
              alt="star"
              className="mx-[4px]"
              onClick={() => handleRating(5)}
            />
          )}
        </div>
        <div className="font-semibold text-lg mt-5">
          Help others by sharing your feedback
        </div>
        <div className="text-base font-normal mt-1">
          What do you like about this? Describe your experience with this shop.
        </div>
        <textarea
          className="w-full h-45 resize-none overflow-y-scroll mt-5"
          onChange={(e) => handleChangeText(e)}
          style={{ maxHeight: "200px" }}
        />
        <div className="flex mt-10">
          <div>
            <div className="font-semibold text-lg">
              Add a photo
              <span className="font-normal text-lg text-gray-400">
                {" "}
                (Optional)
              </span>
            </div>
            <div className="font-normal text-base">
              Show your appreciation and inspire the community.
            </div>
          </div>
          <div className="w-32 rounded-2xl border-solid border-1 !border-red-500  h-32 items-center flex justify-center  z-60">
            <div className="flex-shrink-0 flex items-start">
              {/* AVATAR */}
              {/* <CheckingProfile/> */}
              <div className="relative rounded-full overflow-hidden flex">
                {filebase64 ? (
                  <img
                    alt="img"
                    src={filebase64}
                    style={{
                      zIndex: "5",
                      width: "130px",
                      height: "130px",
                    }}
                  />
                ) : (
                  <img
                    src={camera}
                    alt="img"
                    className="w-12 h-12 rounded-full object-cover z-5"
                  />
                )}

                <div
                  onClick={handleFileUpload}
                  className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    ref={inputRef}
                    // onChange={(e) => handleFileUpload(e)}
                    type="file"
                    style={{ display: "none", zIndex: "5" }}

                    // multiple={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="font-medium text-sm bg-white border rounded-full py-2.5 border-black px-11"
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button
            disabled={descriptionText === ""}
            className={`font-medium text-sm bg-black text-white rounded-full py-2.5 px-8 ${
              descriptionText === "" && "opacity-70"
            }`}
            onClick={submitReview}>
            Post Your Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
