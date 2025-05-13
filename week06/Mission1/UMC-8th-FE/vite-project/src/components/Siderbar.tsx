interface SidebarProps {
    isOpen: boolean;
}

const Siderbar = ({ isOpen }: SidebarProps) => {
    return(
        <aside
            className={`${
                isOpen ? "block" : "hidden"
            } md:block min-w-[180px] w-[200px] h-screen bg-[#121210] text-white p-6 space-y-6 relative`}
            >
            <div className="p-4 space-y-4">
                <div className="hover:text-pink-500 cursor-pointer">🔍 찾기</div>
                <div className="hover:text-pink-500 cursor-pointer">👤 마이페이지</div>
                <div className="bottom-6 left-6 hover:text-red-500 cursor-pointer">
            🚪 탈퇴하기
                </div>
            </div>
        </aside>
    )
};

export default Siderbar;