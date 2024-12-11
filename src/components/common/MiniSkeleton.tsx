import React from "react";

function MiniSkeleton() {
  return (
    <div role="status" className="max-w-sm rounded animate-pulse flex gap-4">
      <div className="flex items-center justify-center h-[60px] w-20 mb-4 bg-gray-300 rounded"></div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full w-28 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-1.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-1.5"></div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default MiniSkeleton;
