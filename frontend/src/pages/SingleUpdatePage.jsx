import React from "react";
import PageTitle from "../components/layout/PageTitle";
import SingleNewsSkeleton from "../components/skeletons/newsPage/SingleNewsSkeleton";
import { GoDotFill } from "react-icons/go";

function SingleUpdatePage() {
  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle
        link={"/updates"}
        title={"Weekend cashback offer: Get 10% cashback"}
      />

      <div className=" pb-16 px-4 mt-4">
        {/* <SingleNewsSkeleton /> */}

        <div className="w-full h-64 bg-light rounded-lg overflow-hidden">
          <img
            src="https://learn.zoner.com/wp-content/uploads/2025/04/zoner-ai-image-creator.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className=" flex items-center gap-1 mt-4">
          <div>
            <GoDotFill className=" size-3 text-textGry" />
          </div>
          <h2 className=" text-sm  text-textPrimary">Just now</h2>
        </div>

        <div className=" mt-3">
          <h1 className=" text-xl leading-6 font-medium text-secondary">
            Weekend cashback offer: Get 10% cashback
          </h1>
        </div>

        <div className=" mt-4">
          <h4 className=" font-light text-textPrimary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            distinctio sint laudantium harum ipsam labore eligendi corporis ipsa
            eaque, reiciendis sapiente perspiciatis qui fugit repudiandae
            adipisci quas libero, facere fugiat. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tempora distinctio sint laudantium
            harum ipsam labore eligendi corporis ipsa eaque, reiciendis sapiente
            perspiciatis qui fugit repudiandae adipisci quas libero, facere
            fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Tempora distinctio sint laudantium harum ipsam labore eligendi
            corporis ipsa eaque, reiciendis sapiente perspiciatis qui fugit
            repudiandae adipisci quas libero, facere fugiat. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Tempora distinctio sint
            laudantium harum ipsam labore eligendi corporis ipsa eaque,
            reiciendis sapiente perspiciatis qui fugit repudiandae adipisci quas
            libero, facere fugiat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tempora distinctio sint laudantium harum ipsam
            labore eligendi corporis ipsa eaque, reiciendis sapiente
            perspiciatis qui fugit repudiandae adipisci quas libero, facere
            fugiat. libero, facere fugiat. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tempora distinctio sint laudantium
            harum ipsam labore eligendi corporis ipsa eaque, reiciendis sapiente
            perspiciatis qui fugit repudiandae adipisci quas libero, facere
            fugiat.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SingleUpdatePage;
