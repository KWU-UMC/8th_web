const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg animate-pulse shadow">
      <div className="w-10 h-10 bg-gray-600 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="w-24 h-4 bg-gray-600 rounded" />
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-3/4 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
