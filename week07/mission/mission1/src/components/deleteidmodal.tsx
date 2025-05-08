import { useMutation } from "@tanstack/react-query";
import { delete_user } from "../apis/userapi";
import { useSidebar } from "../contexts/sidebar";
import { useAuth } from "../contexts/authcontext";
import { useRef } from "react";

export default function Deleteidmodal() {
  const { setIsDeleteModalOpen } = useSidebar();
  const modalRef = useRef<HTMLDivElement>(null);
  const { accessToken, setIsLoggedIn } = useAuth();

  const { mutate } = useMutation({
    mutationFn: delete_user,
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsLoggedIn(false);
    },
  });
  const handleDeleteId = () => {
    mutate(accessToken);
  };
  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div
      onClick={handleCloseModal}
      className="w-full h-full fixed top-0 left-0 bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center"
    >
      <div
        ref={modalRef}
        className="w-[400px] bg-white rounded-2xl p-2 shadow-[0 4px 6px rgba(0, 0, 0, 0.1)] flex flex-col gap-10 justify-center items-center p-4"
      >
        <span>정말 탈퇴하시겠습니까?</span>
        <div className="flex gap-10">
          <button onClick={handleDeleteId}>예</button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
