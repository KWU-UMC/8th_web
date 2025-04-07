import './index.css'

function App() {
  return (
      <div className="mt-12 w-96 mx-auto bg-neutral-300 p-8 rounded-2xl">
          <div className="flex gap-4 h-4 justify-center items-center relative">
              <button className="absolute left-0 hover:bg-neutral-400 p-4 rounded-xl">&lt;</button>
              <p className="text-2xl">로그인</p>
          </div>

          <div className="flex mt-8 p-4 border border-white rounded-xl items-center relative hover:ring-2 hover:ring-blue-500 cursor-pointer">
              <span className="text-xl text-blue-500 absolute left-4">G</span>
              <span className="w-full text-center">Google 로그인</span>
          </div>

          <hr className="my-4 border-gray-400" />

          <input
              type="email"
              id="email"
              className="mb-4 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
          />

          <input
              type="password"
              id="password"
              className="mb-4 w-full p-2 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
          />

          <button className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
              로그인
          </button>
      </div>
  )
}

export default App
