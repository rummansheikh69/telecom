import React from "react";

import { globalModal } from "../modals/modalManager";
import { HiUser } from "react-icons/hi2";
import { MdOutlineEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Stars from "../ratings/Stars";

function ReviewCard({ review, section }) {
  return (
    <>
      {/* reviews card */}

      <div className=" w-full p-3 bg-subMain mb-4 rounded-lg">
        <div className=" flex items-center justify-between gap-1">
          <div className=" flex items-center gap-3">
            <div className=" size-10 rounded-full overflow-hidden">
              {review?.profileImage ? (
                <img
                  src={review?.profileImage}
                  alt={review?.name}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <div className=" w-full h-full flex items-center justify-center rounded-full border-2 border-secondary/90">
                  <HiUser className=" size-10 mt-3 text-secondary/90" />
                </div>
              )}
            </div>

            <div>
              <h2 className=" text-base leading-4 font-medium text-textPrimary/90 capitalize ">
                {review?.name}
              </h2>
              <h3 className=" font-light text-sm text-textPrimary">
                {review?.createdAt}
              </h3>
            </div>
          </div>

          {/* rating stars */}
          <Stars rating={review?.rating} countShow={false} />
        </div>

        {/* comment  */}
        <div className=" mt-3">
          <p className=" text-sm font-light text-textPrimary ">
            {review?.comment}
          </p>
        </div>
        {/* comment end */}

        {section === "my_reviews" && (
          <div className=" border-t border-darkLight mt-2 flex gap-2.5 items-center justify-end">
            <div
              onClick={() =>
                globalModal.open("edit_review_modal", {
                  reviewId: review?._id,
                  username: review?.name,
                  rating: review?.rating,
                  user_comment: review?.comment,
                })
              }
              className=" flex items-center gap-1 cursor-default px-2 py-1.5"
            >
              <div>
                <MdOutlineEdit />
              </div>
              <span className=" text-sm text-textPrimary font-light">Edit</span>
            </div>
            <div
              onClick={() =>
                globalModal.open("delete_review_modal", {
                  userId: review._id,
                  username: review.name,
                  user_comment: review?.comment,
                })
              }
              className=" flex items-center gap-1 cursor-default px-2 py-1.5"
            >
              <div>
                <FiTrash2 className=" text-red-500" />
              </div>
              <span className=" text-sm text-textPrimary font-light">
                Delete
              </span>
            </div>
          </div>
        )}
      </div>

      {/* reviews card end */}
    </>
  );
}

export default ReviewCard;
