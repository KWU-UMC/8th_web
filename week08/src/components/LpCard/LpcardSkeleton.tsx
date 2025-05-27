const LpCardSkeleton = () => {
  return (
    <div className="relative group bg-zinc-900 rounded animate-pulse">
      <div className="bg-gray-300 w-full aspect-square object-cover"></div>
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0">
        <div className="bg-gray-400 h-4 w-3/4 rounded-sm"></div>
      </div>
    </div>
  );
};

export default LpCardSkeleton;
