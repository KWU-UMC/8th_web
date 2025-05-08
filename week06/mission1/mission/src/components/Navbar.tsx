import { NavLink } from 'react-router-dom';

const LINKS = [
    { to: '/', label: "홈" },
    { to: '/login', label: "로그인" },
    { to: '/signup', label: "회원가입" },
]

export const Navbar = () => {
    return (
        <div className="flex gap-3 p-4">
            {LINKS.map(({ to, label }) => (
            <NavLink
                key={to}
                to={to}
                className={({isActive}) => {
                    return isActive ? 'text-[#000000] font-bold' : 'text-gray-500';
                }} 
                >
                {label}
            </NavLink>
        ))}
    </div>
    );
};