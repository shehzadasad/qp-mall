import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";
import grayStar from "../images/review/grayStar.svg";
import star from "../images/star.svg";
interface ReviewItemDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
  rating: number;
  comments: string;
  reviewImage: string;
  
}

export interface ReviewItemProps {
  className?: string;
  data?: ReviewItemDataType;
  name?: string;
  user_image?: string;
  avatar?: string;
  date?: string;
  rating?: number;
  comments?: string;
  reviewImage?: string;
}

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data,
  name,
  user_image,
  avatar,
  date,
  rating,
  comments,
  reviewImage,
}) => {
  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem">
      <div className=" flex space-x-4 ">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={name}
            imgUrl={avatar}
          />
        </div>

        <div className="flex-1 flex justify-between">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{name}</span>
            <span className="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">
              {date}
            </span>
          </div>

          <div className="mt-0.5 flex text-yellow-500">
            <div className="flex mt-7">
              {rating === 1 ||
              rating === 2 ||
              rating === 3 ||
              rating === 4 ||
              rating === 5 ? (
                <img src={star} alt="" className="w-5 h-5" />
              ) : (
                <img src={grayStar} alt="" className="w-5 h-5" />
              )}

              {rating === 2 || rating === 3 || rating === 4 || rating === 5 ? (
                     <img src={star} alt="" className="w-5 h-5" />
              ) : (
                <img src={grayStar} alt="star" className="w-5 h-5" />
              )}
              {rating === 3 || rating === 4 || rating === 5 ? (
                    <img src={star} alt="" className="w-5 h-5" />
              ) : (
                <img src={grayStar} alt="star" className="w-5 h-5" />
              )}
              {rating === 4 || rating === 5 ? (
                    <img src={star} alt="" className="w-5 h-5" />
              ) : (
                <img src={grayStar} alt="star" className="w-5 h-5" />
              )}
              {rating === 5 ? (
                    <img src={star} alt="" className="w-5 h-5" />
              ) : (
                <img src={grayStar} alt="star" className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{comments}</p>
        <img src={reviewImage} alt="" />
      </div>
    </div>
  );
};

export default ReviewItem;
