import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/sidebar";
import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { useAuth } from "../contexts/authcontext";
import { useMutation } from "@tanstack/react-query";
import { signout } from "../apis/authapi";

export default function Header() {
  const navigate = useNavigate();
  const { setIsOpen } = useSidebar();
  const { isLoggedIn, setIsLoggedIn, accessToken } = useAuth();
  const { data } = useAuth();

  const onMenuClick = () => {
    setIsOpen((prev) => !prev);
  };
  const { mutate } = useMutation({ mutationFn: signout });
  const handleSignOut = () => {
    mutate(accessToken);
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-15 p-4 bg-amber-400 fixed top-0 flex justify-between items-center z-10">
      <div className="flex gap-4 items-center">
        <IoMenu onClick={onMenuClick} className="cursor-pointer text-2xl" />
        <h2
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          UMC LP
        </h2>
      </div>
      <div className="flex gap-4 justify-around items-center">
        <IoSearchSharp
          className="font-bold cursor-pointer"
          onClick={() => navigate("/find")}
        />
        {isLoggedIn ? (
          <div className="flex gap-4">
            <span>{data?.name}님 환영합니다</span>
            <button className="cursor-pointer" onClick={handleSignOut}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              className="cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              로그인
            </button>
            <button
              className="cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
