const CommentSkeleton = () => {
  return (
    <div className="animate-pulse flex items-start gap-4 p-4 bg-gray-800 rounded-lg shadow">
      {/* 아바타 */}
      <div className="w-10 h-10 bg-gray-600 rounded-full" />
      {/* 텍스트 라인들 */}
      <div className="flex-1 space-y-2">
        <div className="w-24 h-4 bg-gray-600 rounded" />
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
