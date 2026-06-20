import React from "react";

function Star({ fillPercentage }) {
  return (
    <div className="relative w-4 h-4">
      {/* Empty Star */}
      <svg
        className="absolute w-4 h-4 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118l-3.384-2.46a1 1 0 00-1.176 0l-3.384 2.46c-.784.57-1.838-.196-1.539-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.175 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.156-3.973z" />
      </svg>

      {/* Filled Part */}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fillPercentage}%` }}
      >
        <svg
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118l-3.384-2.46a1 1 0 00-1.176 0l-3.384 2.46c-.784.57-1.838-.196-1.539-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.175 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.156-3.973z" />
        </svg>
      </div>
    </div>
  );
}

export default function Stars({
  rating = 0,
  reviewCount = 0,
  countShow = true,
}) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const difference = rating - (i - 1);
    let fill = 0;

    if (difference >= 1) {
      fill = 100;
    } else if (difference > 0) {
      fill = difference * 100;
    }

    stars.push(<Star key={i} fillPercentage={fill} />);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">{stars}</div>
      {countShow && (
        <span className="text-sm text-gray-600">
          {rating?.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
