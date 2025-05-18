import LpCardSkeleton from "./LpcardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}
const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
