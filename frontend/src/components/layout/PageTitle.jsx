import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function PageTitle({ link, title }) {
  return (
    <div className=" sticky top-0 z-50 flex items-center gap-2 h-14 px-4 w-full bg-secondary">
      <Link to={link}>
        <div className=" cursor-pointer p-2">
          <IoArrowBackOutline className=" text-2xl text-white " />
        </div>
      </Link>
      <h1 className=" text-xl font-bold text-white">{title}</h1>
    </div>
  );
}

export default PageTitle;
