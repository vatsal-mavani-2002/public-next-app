import React from "react";

function Skeleton() {
  return (
    <div role="status" className="max-w-sm rounded animate-pulse">
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded"></div>
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Skeleton;