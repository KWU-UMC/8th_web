import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { modify_user, user } from "../apis/userapi";
import { useAuth } from "../contexts/authcontext";
import { upload_img } from "../apis/authapi";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const { data, accessToken } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await user({ userId: String(data?.id), accessToken });
      setName(response.data.name);
      setBio(response.data.bio || "");
      setEmail(response.data.email);
      setImgUrl(response.data.avatar || "");
    };
    getUser();
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await upload_img({ file, accessToken });
      setImgUrl(imageUrl.imageUrl);
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };
  const { mutate } = useMutation({
    mutationFn: modify_user,
    onSuccess: () => {
      alert("프로필 변경 완료");
      navigate("/");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name !== "") {
      mutate({ name, bio, avatar: imgUrl, accessToken });
    } else {
      alert("닉네임은 빈칸일 수 없습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div>
          <img
            src={imgUrl}
            className="w-32 h-32 rounded-full object-cover cursor-pointer border-1 border-white"
            onClick={handleClick}
          />
          <input
            ref={inputRef}
            onChange={handleProfileChange}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-1 justify-between [&>input]:p-1 [&>input]:border [&>input]:rounded-xl">
          <input onChange={handleNameChange} value={name} />
          <input
            onChange={handleBioChange}
            value={bio}
            placeholder="자신을 소개해보세요!"
          />
          <span>{email}</span>
          <button className="cursor-pointer" type="submit">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
