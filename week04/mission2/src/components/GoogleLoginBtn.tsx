import Google from '../images/Google.png';

interface Props {
  onClick?: () => void;
}

const GoogleLoginButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full border border-white rounded-md py-2 mb-4 hover:bg-white hover:text-black transition text-center"
    >
      <img
        src={Google}
        alt="Google"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
      />
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;