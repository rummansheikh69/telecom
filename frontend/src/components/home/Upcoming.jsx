import { Link } from "react-router-dom";

function Upcoming() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {/* Today's Update */}
      <Link to={"/updates"}>
        <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
          <div className=" size-14">
            <img
              src="images/newspaper.png"
              alt="today's update"
              className=" w-full h-full object-contain opacity-80"
            />
          </div>
          <p className="text-base text-primary font-medium">Updates</p>
        </div>
      </Link>

      {/* app store */}
      <Link to={"/apps"}>
        <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
          <div className=" size-14">
            <img
              src="images/app.png"
              alt="wallet"
              className=" w-full h-full object-contain opacity-80"
            />
          </div>
          <p className="text-base text-primary font-medium">App Store</p>
        </div>
      </Link>

      {/* investment */}
      <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-14">
          <img
            src="images/invest.png"
            alt="wallet"
            className=" w-full h-full object-contain opacity-80"
          />
        </div>
        <p className="text-base text-primary font-medium">Investment</p>
      </div>

      {/* upcoming */}
      {/* <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-14">
          <img
            src="images/upcoming.png"
            alt="wallet"
            className=" w-full h-full object-contain opacity-80"
          />
        </div>
        <p className="text-base text-primary font-medium">Upcoming</p>
      </div> */}
    </div>
  );
}

export default Upcoming;
