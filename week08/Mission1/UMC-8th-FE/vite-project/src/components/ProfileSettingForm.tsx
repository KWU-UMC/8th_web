import { useState } from "react";
import { useUpdateProfile } from "../hooks/mutations/useUpdateProfile";
import { ResponseMyInfoDto } from "../types/auth";

interface Props {
  initialData: ResponseMyInfoDto["data"];
  onSuccess: () => void;
}

const ProfileSettingForm = ({ initialData, onSuccess }: Props) => {
  const [name, setName] = useState(initialData.name ?? "");
  const [bio, setBio] = useState(initialData.bio ?? "");
  const [avatar, setAvatar] = useState(initialData.avatar ?? "");

  const updateProfileMutation = useUpdateProfile();

  const handleSubmit = () => {
    updateProfileMutation.mutate(
      { name, bio, avatar },
      {
        onSuccess: () => {
          alert("수정 성공!");
          onSuccess(); // 마이페이지에 editMode 해제 요청
        },
        onError: () => {
          alert("수정 실패");
        },
      }
    );
  };

  return (
    <div className="p-4 bg-[#1e1e1e] rounded-md text-white space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        className="bg-[#2a2a2a] p-2 w-full rounded"
      />
      <input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="한줄 소개"
        className="bg-[#2a2a2a] p-2 w-full rounded"
      />
      <input
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="프로필 사진 URL"
        className="bg-[#2a2a2a] p-2 w-full rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-pink-500 px-4 py-2 rounded"
      >
        저장
      </button>
    </div>
  );
};

export default ProfileSettingForm;
