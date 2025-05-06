- XSS 공격
  Cross Site Scripting의 약자로 게시판이나 웹 메일 등에 자바 스크립트와 같은 스크립트 코드를 삽입 해 개발자가 고려하지 않은 기능이 작동하게 하는 치명적인 공격이다. XSS 공격에는 크게 Reflected XSS Stored XSS DOM Based XSS가 있다.
  우선 공격자가 미리 XSS 공격에 취약한 웹 사이트를 탐색하고 XSS 공격을 위한 스크립트를 포함한 URL을 사용자에게 노출시킨다.
  Reflected XSS
  사용자가 해당 URL을 클릭할 경우 취약한 웹 사이트의 서버에 스크립트가 포함된 URL을 통해 Request를 전송하고 웹 서버에서는 해당 스크립트를 포함한 Response를 전송하게 된다. 즉
  악성 스크립트가 URL 파라미터나 폼 입력으로 들어가고, 즉시 응답에 반영되어 실행된다.
  Stored XSS
  악성 스크립트를 DB나 서버 파일 시스템에 저장되어 다른 사용자가 해당 데이터를 볼 때 서버로 부터 전달되어 브라우저에서 실행된다.
  예시) 공격자가 웹사이트 게시판에 글을 남길 때 악성코드 스크립트를 포함해서 작성하게 되면은 웹사이트는 이를 필터링 없이 데이터베이스에 저장하게된다. 이 후 다른 사용자가 해당 게시판을 보게 되면 저장된 글이 브라우저로 전달되고 악성스크립트가 실행된다. 이를 통해서 피해자는 모르는 사이에 쿠키 세션 개인정보를 공격자에게 다 넘겨주게 된다.
  Dom-based XSS
  DOM을 조작하는 클라이언트 측 자바스크립트 코드에서 사용자 입력을 적절히 검증하지 않고 반영해서 발생하는 XSS로 브라우저 안의 JS 코드가 취약한 상태일때 공격에 성공할 수 있다.
  예시) 웹사이트가 URL 파라미터를 가져오게 되는데 이때 이 코드를 그대로 DOM에 삽입하거나 innerHTML document.write 등에 넣게되면은 브라우저에서 삽입한 내용을 그대로 HTML로 해석되고 이를 통해서 악성 스크립트가 실행되게 된다.
- CSRF 공격
  CSRF은 Cross Site Request Forgery의 약자로 사이트 간 요청 위조라는 뜻이다. 이는 사용자의 인증된 세션을 이용하여서 공격자가 원하지 않는 요청을 대신보내게 하는 공격이다. 이러한 공격의 주대상은 변경 동작으로 송금 글쓰기 비밀번호 변경을 할때 CSRF 공격이 들어올 수 있다.

### 실습 🍠

서버가 없으니, 아래와 같이 가상의 역할을 만들어 직접 구현해보세요!

    const role = 'ADMIN';

const ProtectedRoute=({children}=>{
if(role!=requiredRole){
return <Navigate to="/unauthorized" replace />;
}
}) // requiredRole이 아닌 role이 들어오면 Navigate로 다시 돌아감
requiredRole에서 role을 판단
<Route
path="/admin" // admin을 받게되면 주소 뒤에 admin으로 이동하고
element={
<ProtectedRoute requiredRole="admin">
<AdminPage />
</ProtectedRoute>
}
/>
