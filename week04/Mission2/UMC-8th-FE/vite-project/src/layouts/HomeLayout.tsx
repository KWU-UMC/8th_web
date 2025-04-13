import { Outlet } from "react-router-dom";

const HomeLayout = () =>{
    return(
        <div className="h-dvh flex flex-col bg-black">
            <nav className="bg-[#121210] text-pink-500 font-bold p-5 text-lg
            flex justify-between items-right"> 
                <div> 돌려돌려LP판 </div>
                <div className="flex space-x-3">
                    <button className="bg-black text-white py-1 px-3 rounded-md
                    hover:bg-pink-600 transition-colors text-sm"> 로그인 </button>
                    <button  className="bg-black text-white py-1 px-3 rounded-md
                    hover:bg-pink-600 transition-colors text-sm"> 회원가입 </button>
                </div>
            </nav>
            <main className="flex-1"> 
                <Outlet/> 
            </main>
            {/* <footer> 푸터 </footer> */}
        </div>
    );
};

export default HomeLayout;