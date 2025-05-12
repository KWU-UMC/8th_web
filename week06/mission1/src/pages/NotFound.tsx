const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <p>올바른 URL을 입력했는지 확인해 주세요.</p>
      <p>홈페이지로 돌아가시려면 아래 버튼을 클릭하세요.</p>
      <button onClick={() => (window.location.href = "/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
};
export default NotFound;
