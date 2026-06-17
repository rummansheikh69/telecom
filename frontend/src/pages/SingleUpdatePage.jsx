import React from "react";
import PageTitle from "../components/layout/PageTitle";
import SingleNewsSkeleton from "../components/skeletons/newsPage/SingleNewsSkeleton";

function SingleUpdatePage() {
  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle
        link={"/updates"}
        title={"Weekend cashback offer: Get 10% cashback"}
      />

      <div className=" pb-16 px-4">
        <SingleNewsSkeleton />
      </div>
    </div>
  );
}

export default SingleUpdatePage;
