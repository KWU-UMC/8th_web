import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
    refetch,
  } = useGetLpDetail({ lpid: Number(lpid) });

  const { data: me } = useGetMyInfo(accessToken);
  console.log(me);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes?.some(
    (like) => Number(like.userId) === Number(me?.data.id)
  );

  const handleLikeLp = async () => {
    likeMutate(
      { lpid: Number(lpid) },
      {
        onSuccess: async () => {
          const result = await refetch();
          console.log(" refetch 이후 lp:", result.data);
        },
        onError: (err: any) => {
          if (err.response?.status === 409) {
            alert("이미 좋아요를 누르셨습니다.");
          }
        },
      }
    );
  };

  const handledisLikeLp = () => {
    dislikeMutate(
      { lpid: Number(lpid) },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError)
    return <div className="mt-20 text-red-400">Error loading data.</div>;

  return (
    <div className="mt-20">
      <h1>{lp?.data.id}</h1>
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>
      <button onClick={isLiked ? handledisLikeLp : handleLikeLp} type="button">
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};
export default LpDetailPage;
