import { NavLink } from "react-router-dom";

const Footer = () => {
//     <p> &copy; </p> //copyright 가져오는 느낌
    return <footer className="bg-[#121210] shadow-md p-3 text-lg
            flex justify-between items-right">
                <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
                    <p> &copy; {new Date().getFullYear()} 돌려돌려LP판. All rights reserved.</p>
                    <div className={"flex justify-center space-x-3 mt-4"}>
                        <NavLink to="#"> Privacy Policy </NavLink>
                        <NavLink to="#"> Terms of Policy </NavLink>
                        <NavLink to="#"> Contact Policy </NavLink>
                    </div>
                </div>
        </footer>;

};

export default Footer;