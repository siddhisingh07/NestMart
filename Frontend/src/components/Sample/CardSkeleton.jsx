export const CardSkeleton = () => {
  return (
    <div className="w-[19rem] md:w-[18rem] lg:w-[19rem] xl:w-[19rem] 2xl:w-[20rem] bg-white border border-gray-300 rounded-2xl overflow-hidden shadow animate-pulse">

      {/* Image Placeholder */}
      <div className="w-full h-40 lg:h-56 bg-gray-200"></div>

      {/* Product Info */}
      <div className="px-5 pb-6 space-y-3 mt-3">
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-40 bg-gray-200 rounded"></div>

        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
