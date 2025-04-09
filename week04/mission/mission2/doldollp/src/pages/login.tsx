export default function Login() {
  return (
    <div>
      <div>
        <button></button>
        <h2>로그인</h2>
      </div>
      <div>
        <hr className="solid" />
        <span>OR</span>
        <hr className="solid" />
      </div>
      <div>
        <form>
          <input placeholder="이메일을 입력해주세요!" />
          <input placeholder="비밀번호를 입력해주세요!" />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
