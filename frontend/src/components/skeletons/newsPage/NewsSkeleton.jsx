import React from "react";
import Core from "../Core";

function NewsSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-12 gap-3 p-4 rounded-lg bg-subMain border border-textGry/20">
      <div className=" col-span-8">
        <Core className={"w-full"} />
        <Core className={"mt-2 w-32"} />
        <Core className={"mt-2 w-40"} />
      </div>
      <div className=" col-span-4">
        <Core className={" w-full h-full"} rounded={"rounded-full"} />
      </div>
    </div>
  );
}

export default NewsSkeleton;
