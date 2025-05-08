import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { delete_lp, like, lp } from "../apis/lpapi";
import { formatDate } from "../utils/date";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Comments from "./comments";
import { useState } from "react";
import Modifylpmodal from "../components/modifylpmodal";
import { useAuth } from "../contexts/authcontext";

export default function Detail() {
  const params = useParams();
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const { data: userData, accessToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["lp", params.lpID],
    queryFn: () => lp({ id: params.lpID as string }),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: delete_lp,
    onSuccess: () => {
      alert("lp를 삭제했습니다.");
      navigate("/");
    },
  });
  const handleDeleteLp = () => {
    deleteMutate({ lpId: params.lpID as string, accessToken });
  };

  const { mutate: likeMutate } = useMutation({
    mutationFn: like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", params.lpID] });
    },
  });
  const handleLike = () => {
    likeMutate({ lpId: params.lpID as string, accessToken });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full p-4">
      <div className="w-4/5 min-h-4/5 bg-gray-500 flex flex-col gap-6 px-10 py-10 text-white rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 justify-center items-center">
            {data?.data.author?.avatar && (
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={data?.data.author?.avatar as string}
                alt="avatar"
              />
            )}
            <span>{data?.data.author?.name}</span>
          </div>
          <span>{formatDate(data?.data.createdAt as string)}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3>{data?.data.title}</h3>
          <div className="flex gap-4">
            {data?.data.authorId == userData?.id && (
              <>
                <FaPencilAlt
                  onClick={() => setIsModifyModalOpen(true)}
                  className="cursor-pointer"
                />
                <FaRegTrashAlt
                  onClick={handleDeleteLp}
                  className="cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-gray-700 shadow-2xl flex justify-center items-center">
            <img
              className="object-cover w-4/5 h-4/5 rounded-full"
              src={data?.data.thumbnail}
              alt="thumbnail"
            />
          </div>
        </div>
        <div>
          <span>{data?.data.content}</span>
        </div>
        <div className="flex gap-4 justify-center">
          {data?.data.tags.map((tag, index) => (
            <div
              key={index}
              className="w-auto h-7 p-4 bg-gray-400 flex justify-center items-center rounded-2xl"
            >
              <span># {tag.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <FaHeart onClick={handleLike} className="cursor-pointer" />
          <span>{data?.data.likes.length}</span>
        </div>
      </div>
      <Comments />
      {isModifyModalOpen && (
        <Modifylpmodal setIsModifyModalOpen={setIsModifyModalOpen} />
      )}
    </div>
  );
}
