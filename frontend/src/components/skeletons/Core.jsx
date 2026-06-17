import React from "react";

function Core({ width, height = "6", className, rounded = "lg" }) {
  return (
    <div
      className={`relative overflow-hidden  bg-light h-${height} ${className} rounded-${rounded}`}
    >
      {/* The Glare Layer */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.5s_infinite]"
        style={{
          animationName: "shimmer",
          animationDuration: "1.5s",
          animationIterationCount: "infinite",
        }}
      />

      {/* Inline injection of the keyframes so the browser recognizes the animation */}
      <style>{`
            @keyframes shimmer {
             0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
             }
            `}</style>
    </div>
  );
}

export default Core;
