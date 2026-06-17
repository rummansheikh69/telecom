import PageTitle from "../components/layout/PageTitle";
import { Link } from "react-router-dom";
import Loader from "../components/skeletons/Loader";
import NewsSkeleton from "../components/skeletons/newsPage/NewsSkeleton";
import NewsCard from "../components/news/NewsCard";

function UpdatesPage() {
  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Today's Updates"} />

      <div className=" pb-16 px-4">
        <NewsCard />

        {/* <NewsSkeleton /> */}

        <div className=" cursor-pointer mx-auto w-28 h-9 flex items-center justify-center bg-light rounded-lg mt-4">
          <h2 className=" text-center text-sm font-medium text-secondary ">
            Load more
          </h2>
          {/* <Loader /> */}
        </div>
      </div>
    </div>
  );
}

export default UpdatesPage;
