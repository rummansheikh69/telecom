import { GoDotFill } from "react-icons/go";
import PageTitle from "../components/layout/PageTitle";
import { Link } from "react-router-dom";
import Loader from "../components/skeletons/Loader";
import NewsSkeleton from "../components/skeletons/newsPage/NewsSkeleton";

function UpdatesPage() {
  const text =
    "Don't miss out on this limited-time offer to save more on your purchases!";
  const truncatedText = text.length > 50 ? `${text.substring(0, 50)}...` : text;

  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Today's Updates"} />

      <div className=" pb-16 px-4">
        <Link to={`/updates/1232`}>
          <div className="mt-4 grid grid-cols-12 gap-3 p-4 rounded-lg bg-subMain border border-textGry/20">
            <div className=" col-span-8">
              <div className=" flex items-center gap-1">
                <div>
                  <GoDotFill className=" size-3 text-textGry" />
                </div>
                <h2 className=" text-xs font- text-textPrimary">2h ago</h2>
              </div>

              <div className=" mt-1">
                <h1 className=" text-lg leading-6 font-medium text-secondary">
                  Weekend cashback offer: Get 10% cashback
                </h1>
              </div>

              <div className=" mt-1">
                <h1
                  className="text-base leading-5 text-textPrimary"
                  title={text}
                >
                  {truncatedText}
                </h1>
              </div>
            </div>
            <div className=" col-span-4">
              <div className=" bg-light rounded-lg size-full overflow-hidden">
                <img
                  src="https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg"
                  className=" w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Link>

        <NewsSkeleton />

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
