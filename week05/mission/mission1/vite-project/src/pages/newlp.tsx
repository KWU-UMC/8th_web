import { useState } from "react";
import { auth } from "../apis/auth";
import { useAuth } from "../context/auth_context";
import { useNavigate } from "react-router-dom";

export default function Newlp() {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const navigate = useNavigate();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target.value);
  };
  const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTags = tags.split(",").map((e) => e.trim());
    await auth.newLP({
      accessToken,
      title,
      content,
      imgUrl,
      tags: newTags,
      published: true,
    });
    navigate("/");
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <form
        onSubmit={onSubmit}
        className="p-4 w-[300px] h-auto flex flex-col gap-10 border border-amber-700 rounded-2xl"
      >
        <input onChange={onTitleChange} placeholder="제목" />
        <input onChange={onContentChange} placeholder="컨텐츠" />
        <input onChange={onImgUrlChange} placeholder="썸네일 주소" />
        <input onChange={onTagsChange} placeholder="태그 (, 로 구분됩니다)" />
        <input disabled placeholder="공개" />
        <button type="submit" className="cursor-pointer">
          제출
        </button>
      </form>
    </div>
  );
}
