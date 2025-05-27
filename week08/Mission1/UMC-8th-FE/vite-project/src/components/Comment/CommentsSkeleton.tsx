//깜빡 거리기가 있음
const CommentSkeleton = () => {
    return (
    <div className="flex items-start space-x-3 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-gray-600" />
        <div className="flex-1 space-y-2">
            <div className="w-1/4 h-4 bg-gray-600 rounded" />
            <div className="w-3/4 h-4 bg-gray-600 rounded" />
        </div>
    </div>
  );
};

export default CommentSkeleton;
