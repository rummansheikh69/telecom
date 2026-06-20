import React, { useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import { GoDotFill } from "react-icons/go";
import { IoStarSharp } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import Stars from "../components/ratings/Stars";

function ReviewsPage() {
  const [section, setSection] = useState("reviews");

  const reviews = [
    {
      _id: "sdjfldnfdkla",
      name: "Atif Aslam",
      profileImage:
        "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
      rating: 4.5,
      comment: "This guy is awesome",
      createdAt: "12/2/2025",
    },
    {
      _id: "fasd",
      name: "Rumman Sheikh",
      profileImage:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      comment: "This guy is awesome",
      createdAt: "12/2/2025",
    },
    {
      _id: "frhfsd",
      name: "nora Fatehi",
      profileImage: "",
      rating: 3,
      comment: "This guy is awesome",
      createdAt: "12/2/2025",
    },
  ];

  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Reviews"} />

      <div className=" pb-16">
        <div className=" border-b-2 h-12 border-light w-full flex items-center">
          <div
            onClick={() => setSection("reviews")}
            className={` w-full h-full border-b-2 ${section === "reviews" ? "border-secondary bg-secondary/5" : " border-transparent bg-transparent"}  flex items-center justify-center cursor-default`}
          >
            <p className=" text-textPrimary text-base">Reviews</p>
          </div>
          <div
            onClick={() => setSection("my_reviews")}
            className={` w-full h-full border-b-2 ${section === "my_reviews" ? "border-secondary bg-secondary/5" : " border-transparent bg-transparent"}  flex items-center justify-center cursor-default`}
          >
            <p className=" text-textPrimary text-base">My Reviews</p>
          </div>
        </div>

        <div className=" px-4 mt-4">
          {/* profileinfo */}
          <div className=" p-3 bg-light flex items-center rounded-lg">
            <div>
              <h1 className=" text-base font-medium text-textPrimary">
                Md Rony Khan
              </h1>
              <div className=" flex items-center gap-1">
                <h4 className=" text-sm font-light text-textPrimary">
                  Member Since 12/01/2026
                </h4>
                <div>
                  <GoDotFill className=" size-3 opacity-50" />
                </div>
                <h4 className=" text-sm font-light text-textPrimary">
                  120 Reviews
                </h4>
              </div>
            </div>

            <div className=" flex items-center justify-center ml-auto gap-1.5 px-3 h-7 rounded-full bg-secondary text-white">
              <span className=" font-medium text-base">4.6</span>
              <div>
                <IoStarSharp className=" mb-[2px]" />
              </div>
            </div>
          </div>
          {/* profileinfo end */}

          {/* reviews card */}
          <div className=" mt-4">
            {reviews.map((review) => (
              <div key={review?._id}>
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
                        <h2 className=" text-lg leading-4 font-medium text-textPrimary/90 capitalize">
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
                </div>
              </div>
            ))}
          </div>
          {/* reviews card end */}
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
