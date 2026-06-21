import React, { useState, useEffect } from "react";
import PageTitle from "../components/layout/PageTitle";
// Icons to match the aesthetic of image_0321cc.png and image_07e4e7.png
import { MapPin, Home, Building, Globe, Navigation } from "lucide-react";

function AddressPage() {
  // Initial saved address state configuration
  const initialAddress = {
    addressLine: "House 42, Road 11, Sector 4",
    area: "Uttara",
    city: "Dhaka",
    postCode: "1230",
    country: "Bangladesh",
  };

  // Form states
  const [formData, setFormData] = useState(initialAddress);
  const [isDirty, setIsDirty] = useState(false);

  // Check if current input fields differ from initial data
  useEffect(() => {
    const hasChanges = Object.keys(initialAddress).some(
      (key) => formData[key] !== initialAddress[key],
    );
    setIsDirty(hasChanges);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDirty) return;

    console.log("Saving updated primary address:", formData);
    // Insert Axios / Fetch PUT request here
  };

  return (
    <div className="bg-main min-h-screen overflow-y-scroll flex flex-col justify-between font-sans">
      <div>
        {/* Navigates back to the main settings page shown in image_0321cc.png */}
        <PageTitle link={"/profile"} title={"My Address"} />

        <div className="pb-16 mt-6 px-4">
          {/* Header Visual Indicator */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-green-50 border border-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
              <MapPin className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-base font-semibold text-slate-800 mt-3">
              Home Address
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              You can maintain one primary account address
            </p>
          </div>

          {/* Single Address Form Group Wrapper */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            {/* Street / Building Address */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Street Address / House No.
              </label>
              <div className="relative flex items-center">
                <Home className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="e.g. House 12, Road 5"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Area / Neighborhood */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Area / Neighborhood
              </label>
              <div className="relative flex items-center">
                <Navigation className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Gulshan / Banani"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Grid Layout for City & Post Code */}
            <div className="grid grid-cols-2 gap-3">
              {/* City */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                  City
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Dhaka"
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                  Postal Code
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    placeholder="1230"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Country
              </label>
              <div className="relative flex items-center">
                <Globe className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Bangladesh"
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>
          </div>
          {/* Dynamic Save Changes Activation Button */}
          <div className=" active:scale-[0.99] transition pb-8 mt-4">
            <button
              onClick={handleSubmit}
              disabled={!isDirty}
              className={`w-full py-3.5 text-center font-semibold text-sm rounded-xl tracking-wide transition-all duration-200 shadow-sm
            ${
              isDirty
                ? "bg-[#073E7D] text-white hover:bg-blue-900 active:scale-[0.99] cursor-pointer shadow-md"
                : "bg-[#CCD8E6] text-slate-400 cursor-not-allowed"
            }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPage;
