import React from "react";
import Core from "../Core";

function ReviewSkeleton() {
  return (
    <div className=" mt-4">
      <Core className={" w-full h-24"} />
      <Core className={" w-full h-32 mt-4"} />
      <Core className={" w-full h-20 mt-4"} />
    </div>
  );
}

export default ReviewSkeleton;
