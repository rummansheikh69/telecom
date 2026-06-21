import React, { useState, useEffect } from "react";
import PageTitle from "../components/layout/PageTitle";
import { Shield, Lock, Eye, EyeOff, Check, X } from "lucide-react";

function SecurityPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation States
  const [strength, setStrength] = useState(0);
  const [isMatching, setIsMatching] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  useEffect(() => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    setIsDirty(
      oldPassword !== "" || newPassword !== "" || confirmPassword !== "",
    );

    // 1. Check strict 6-character length condition
    const isLengthValid = newPassword.length >= 6;
    setHasMinLength(isLengthValid);

    // 2. Calculate Strength Score (only if it passes the min length)
    let score = 0;
    if (isLengthValid) {
      score++; // Base point for meeting length
      if (/[A-Z]/.test(newPassword)) score++;
      if (/[0-9]/.test(newPassword)) score++;
      if (/[[^A-Za-z0-9]/.test(newPassword)) score++;
    } else if (newPassword.length > 0) {
      score = 0; // "Very Weak" if under 6 characters
    }
    setStrength(newPassword === "" ? 0 : score);

    // 3. Validate Matching State
    if (newPassword && confirmPassword) {
      setIsMatching(newPassword === confirmPassword);
    } else {
      setIsMatching(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Submitting password change payload request...");
    // Put your Axios / Fetch POST/PUT request here
  };

  const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Excellent"];
  const strengthColors = [
    "bg-slate-200",
    "bg-red-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  // Form validation condition enforcing old password presence, match safety, and length constraint
  const isFormValid =
    formData.oldPassword &&
    hasMinLength &&
    isMatching &&
    formData.confirmPassword === formData.newPassword;

  return (
    <div className="bg-main min-h-screen overflow-y-scroll flex flex-col justify-between font-sans">
      <div>
        <PageTitle link={"/profile"} title={"Security"} />

        <div className="pb-16 mt-6 px-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 text-[#073E7D] rounded-2xl flex items-center justify-center shadow-sm">
              <Shield className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-base font-semibold text-slate-800 mt-3">
              Change Password
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your login security configurations
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Current Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current account password"
                  className="w-full pl-11 pr-11 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition"
                >
                  {showOld ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter at least 6 characters"
                  className={`w-full pl-11 pr-11 py-2.5 bg-white border rounded-xl text-sm text-slate-700 focus:outline-none transition
                    ${
                      formData.newPassword && !hasMinLength
                        ? "border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition"
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Requirement Helper Text */}
              {formData.newPassword && !hasMinLength && (
                <p className="text-[11px] text-amber-600 mt-1.5 ml-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
                  Password must be at least 6 characters long.
                </p>
              )}

              {/* Dynamic Progress Bar */}
              {formData.newPassword && hasMinLength && (
                <div className="mt-2.5 px-1 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    <span>Password Strength:</span>
                    <span
                      className={
                        strength <= 2 ? "text-amber-500" : "text-green-600"
                      }
                    >
                      {strengthLabels[strength]}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4].map((barIndex) => (
                      <div
                        key={barIndex}
                        className={`h-full flex-1 transition-all duration-300 ${
                          barIndex <= strength
                            ? strengthColors[strength]
                            : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 pl-1">
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-slate-400 stroke-[1.5]" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your new password"
                  className={`w-full pl-11 pr-11 py-2.5 bg-white border rounded-xl text-sm text-slate-700 focus:outline-none transition
                    ${
                      !isMatching
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Matching Status Warnings */}
              {!isMatching && formData.confirmPassword && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500 pl-1">
                  <X className="w-3.5 h-3.5" />
                  <span>Passwords do not match</span>
                </div>
              )}
              {isMatching &&
                formData.confirmPassword &&
                formData.newPassword &&
                hasMinLength && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-green-600 pl-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Passwords match perfectly</span>
                  </div>
                )}
            </div>
          </div>
          {/* Persistent Button Footer */}
          <div className="active:scale-[0.99] transition pb-8 mt-4">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-3.5 text-center font-semibold text-sm rounded-xl tracking-wide transition-all duration-200 shadow-sm
            ${
              isFormValid
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

export default SecurityPage;
