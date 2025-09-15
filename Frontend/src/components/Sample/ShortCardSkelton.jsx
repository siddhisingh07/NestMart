import React from "react";

const ShortCardSkelton = () => {
  return (
    <div className="flex justify-between shadow-sm mb-6 animate-pulse rounded ">
      {/* Image Skeleton */}
      <div className="w-1/3">
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="w-2/3 p-2 pt-4">
        {/* Product Name */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>

        {/* Price section */}
        <div className="flex items-center space-x-3">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>

  );
};

export default ShortCardSkelton;
