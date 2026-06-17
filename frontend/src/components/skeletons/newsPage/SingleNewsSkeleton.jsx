import React from "react";
import Core from "../Core";

function SingleNewsSkeleton() {
  return (
    <div className=" mt-4">
      <Core className={" w-full h-64"} />
      <Core className={" w-3/4 mt-4 h-8 "} />
      <Core className={" w-full  mt-10"} />
      <Core className={" w-96  mt-4"} />
      <Core className={" w-full  mt-4"} />
      <Core className={" w-4/5  mt-4"} />
    </div>
  );
}

export default SingleNewsSkeleton;
