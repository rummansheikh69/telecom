import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../components/layout/PageTitle";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  Pencil,
  ChevronDown,
} from "lucide-react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi2";

function PersonalInfortmationPage() {
  const fallbackPlaceholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>";

  // Note: HTML date input expects a standard 'YYYY-MM-DD' formatting sequence
  const initialData = {
    fullName: "Md Rony Khan",
    phoneNumber: "+880 1700 112233",
    whatsappNumber: "+880 1700 112233",
    emailAddress: "rony.khan@example.com",
    nidNumber: "1234567890",
    dateOfBirth: "1995-01-15", // Formatted to work natively with <input type="date" />
    gender: "Male",
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
  };

  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null); // Ref anchor to programmatically show the calendar panel

  useEffect(() => {
    const hasChanges = Object.keys(initialData).some(
      (key) => formData[key] !== initialData[key],
    );
    setIsDirty(hasChanges);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Programmatically displays the visual platform calendar picker window
  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        // Fallback option if showPicker isn't supported on old browser builds
        dateInputRef.current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDirty) return;
    console.log("Submitting updated information: ", formData);
  };

  return (
    <div className="bg-main min-h-screen overflow-y-scroll flex flex-col justify-between font-sans">
      <div>
        <PageTitle link={"/profile"} title={"Personal Information"} />

        <div className="pb-16 mt-4 px-4">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28">
              <img
                src={formData.profileImage || fallbackPlaceholder}
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm bg-slate-100"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={handlePencilClick}
                className="absolute bottom-1 right-1 w-8 h-8 bg-[#073E7D] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-blue-900 transition active:scale-95"
              >
                <Pencil className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
            <h2 className="text-base font-semibold text-slate-800 mt-3">
              Profile Photo
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap the pencil to update your photo
            </p>
          </div>

          {/* Form Input Group Wrapper */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Whatsapp Number */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Whatsapp Number
              </label>
              <div className="relative flex items-center">
                <AiOutlineWhatsApp className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Date of Birth
              </label>
              <div
                onClick={handleDateContainerClick}
                className="relative flex items-center cursor-pointer"
              >
                <Calendar className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5] pointer-events-none" />
                <input
                  type="date"
                  name="dateOfBirth"
                  ref={dateInputRef}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  /* 
                     Tailwind utilities below strip off the native calendar action indicator icon 
                     across Webkit (Chrome/Safari) and Firefox layout engines.
                  */
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:absolute 
                    [&::-webkit-calendar-picker-indicator]:left-0 
                    [&::-webkit-calendar-picker-indicator]:top-0 
                    [&::-webkit-calendar-picker-indicator]:w-full 
                    [&::-webkit-calendar-picker-indicator]:h-full 
                    [&::-webkit-calendar-picker-indicator]:opacity-0 
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            {/* Gender Select Box */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Gender
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none stroke-[2]" />
              </div>
            </div>

            {/* NID */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                NID Number
              </label>
              <div className="relative flex items-center">
                <HiOutlineIdentification className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type="text"
                  name="nidNumber"
                  disabled
                  value={formData.nidNumber}
                  onChange={handleChange}
                  className=" cursor-not-allowed w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pb-8 mt-4 active:scale-[0.99] transition">
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

export default PersonalInfortmationPage;
