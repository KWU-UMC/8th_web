import CommentSkeleton from "./CommentsSkeleton";


interface Props {
    count?: number;
}

//skeleton 을 10개씩 묶어서 반복 출력하는거임
const CommentSkeletonList = ({ count = 10 }: Props) => {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
            <CommentSkeleton key={i} />
            ))}
        </div>
    );
};

export default CommentSkeletonList;
