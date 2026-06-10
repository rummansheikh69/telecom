function Upcoming() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {/* upcoming */}
      <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-14">
          <img
            src="images/upcoming.png"
            alt="wallet"
            className=" w-full h-full object-contain opacity-80"
          />
        </div>
        <p className="text-base text-primary font-medium">Upcoming</p>
      </div>

      {/* upcoming */}
      <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-14">
          <img
            src="images/upcoming.png"
            alt="wallet"
            className=" w-full h-full object-contain opacity-80"
          />
        </div>
        <p className="text-base text-primary font-medium">Upcoming</p>
      </div>

      {/* upcoming */}
      <div className="bg-subMain rounded-2xl p-4  shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-14">
          <img
            src="images/upcoming.png"
            alt="wallet"
            className=" w-full h-full object-contain opacity-80"
          />
        </div>
        <p className="text-base text-primary font-medium">Upcoming</p>
      </div>
    </div>
  );
}

export default Upcoming;
