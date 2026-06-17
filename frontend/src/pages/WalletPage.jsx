import React from "react";
import PageTitle from "../components/layout/PageTitle";

function WalletPage() {
  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Wallet"} />

      <div className=" pb-16 px-4 mt-4">
        <div className=" grid grid-cols-2 gap-3 ">
          <div className=" px-3 py-3 rounded-lg bg-gradient-to-tr from-[#1B3B6F] via-[#285694] to-[#3B71B8]">
            <h4 className=" font-bold text-xs tracking-wide uppercase text-gray-200/70">
              Total Balance
            </h4>
            <h2 className=" font-bold text-lg tracking-wide uppercase text-gray-200">
              ৳ 1,234.56
            </h2>
          </div>
          <div className=" px-3 py-3 rounded-lg bg-gradient-to-br from-[#3B71B8] via-[#2A5E9E] to-[#1E4373]">
            <h4 className=" font-bold text-xs tracking-wide uppercase text-gray-200/70">
              loan Balance
            </h4>
            <h2 className=" font-bold text-lg tracking-wide uppercase text-gray-200">
              ৳ 354.00
            </h2>
          </div>
          <div className=" px-3 py-3 rounded-lg bg-gradient-to-br from-[#1E5E6B] via-[#16434F] to-[#0D2933]">
            <h4 className=" font-bold text-xs tracking-wide uppercase text-gray-200/70">
              available Balance
            </h4>
            <h2 className=" font-bold text-lg tracking-wide uppercase text-gray-200">
              ৳ 976.00
            </h2>
          </div>
          <div className=" px-3 py-3 rounded-lg bg-gradient-to-br from-[#4D3E78] via-[#2F2956] to-[#1C1736]">
            <h4 className=" font-bold text-xs tracking-wide uppercase text-gray-200/70">
              Frozen Balance
            </h4>
            <h2 className=" font-bold text-lg tracking-wide uppercase text-gray-200">
              ৳ 334.00
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
