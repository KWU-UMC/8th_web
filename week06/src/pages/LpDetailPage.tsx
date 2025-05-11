import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpid: Number(lpid) });
  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError)
    return <div className="mt-20 text-red-400">Error loading data.</div>;

  return (
    <div className="mt-20">
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>
    </div>
  );
};
export default LpDetailPage;
