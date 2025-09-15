export const CategorySkeleton = () => {
  return (
    <div className="py-3 px-2 rounded flex items-center flex-col flex-shrink-0 w-44 md:w-52 lg:w-32 border border-gray-200 shadow animate-pulse">
      {/* Image Placeholder */}
      <div className="h-24 lg:h-24 w-24 lg:w-24 bg-gray-300 rounded mb-2 lg:mb-2"></div>

      {/* Category Name Placeholder */}
      <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>

    </div>
  );
};
