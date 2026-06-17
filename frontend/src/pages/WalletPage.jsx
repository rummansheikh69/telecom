import React from "react";
import PageTitle from "../components/layout/PageTitle";
import { FiPlusCircle } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiP2pLine } from "react-icons/ri";
import { PiHandCoins } from "react-icons/pi";
import { TbMoneybagMove } from "react-icons/tb";

function WalletPage() {
  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Wallet"} />

      <div className=" pb-16 px-4 mt-4">
        {/* Balance Overview */}
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
        {/* Balance Overview end */}

        <div className=" w-full border-b border-zinc-300 my-4" />

        {/* add money and withdraw money button */}
        <div className=" flex items-center gap-3 ">
          <button className=" flex items-center justify-center w-full gap-2 bg-[#003A7B] text-white py-2.5 rounded-full font-semibold">
            <div>
              <FiPlusCircle size={20} />
            </div>
            <p>Add Money</p>
          </button>
          <button className=" flex items-center justify-center w-full gap-2 bg-[#d2d6da] text-secondary py-2.5 rounded-full font-semibold">
            <div>
              <BiMoneyWithdraw size={20} />
            </div>
            <p>Withdraw</p>
          </button>
        </div>
        {/* add money and withdraw money button end */}

        <div className=" w-full border-b border-zinc-300 my-5" />

        {/* shortcut grid  */}
        <div className=" mt-5 grid grid-cols-3 gap-5">
          {/* statement  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <IoDocumentTextOutline size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary  mt-1.5">Statement</p>
            </div>
          </div>

          {/* transfer  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <FaMoneyBillTransfer size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary mt-1.5">Transfer</p>
            </div>
          </div>

          {/* scan  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <MdOutlineQrCodeScanner size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary mt-1.5 ">Scan Code</p>
            </div>
          </div>

          {/* p2p  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <RiP2pLine size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary mt-1.5 ">P2P Transfer</p>
            </div>
          </div>

          {/* take loan  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <PiHandCoins size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary mt-1.5 ">Take Loan</p>
            </div>
          </div>

          {/* pay loan  */}
          <div className=" w-full h-full flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className=" size-14 rounded-full bg-subMain border border-zinc-200 shadow-sm flex items-center justify-center">
                <TbMoneybagMove size={25} className=" text-secondary" />
              </div>
              <p className=" text-sm text-secondary mt-1.5 ">Pay Loan</p>
            </div>
          </div>
        </div>
        {/* shortcut grid end */}

        <div className=" w-full border-b border-zinc-300 my-5" />

        {/* recent transactions */}
        <div className=" ">
          <h4>Recent Transactions</h4>
        </div>
        {/* recent transactions end */}
      </div>
    </div>
  );
}

export default WalletPage;
