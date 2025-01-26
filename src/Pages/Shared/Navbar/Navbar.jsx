import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Navbar = () => {

    const { user, logOut, setUser } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data)
            return res?.data;

        }
    })

    const handleLogOut = () => {
        logOut()
            .then(() => {
                setUser(null);

            })
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold underline' : 'hover:text-primary font-semibold hover:scale-105'} to={'/'}><li>Home</li></NavLink>
        {
            user?.email && <>
                <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold underline' : 'hover:text-primary font-semibold hover:scale-105'} to={'/allProperties'}><li>All Properties</li></NavLink>

                <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold underline' : 'hover:text-primary font-semibold hover:scale-105'} to={ userProfile.role === 'admin' ? '/dashboard/adminProfile' : userProfile.role === 'agent' ? '/dashboard/agentProfile' : '/dashboard/userProfile'}><li>Dashboard</li></NavLink>
            </>
        }
        <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold underline' : 'hover:text-primary font-semibold hover:scale-105'} to={'/contact'}><li>Contact Us</li></NavLink>
    </>
    return (
        <div className="w-full absolute z-50 backdrop-blur-sm bg-white/10">
            <div className="w-11/12 mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={'/'}>
                        <div className="flex items-center">
                            <img className="h-8 w-8" src='' alt="" />
                            <p className="text-2xl text-amber-700 font-bold hidden md:block">NestTree</p>
                        </div>
                        {/* <button className="btn btn-ghost text-2xl">Recommendo</button> */}
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" flex flex-wrap gap-3 menu-horizontal px-1 text-[16px]">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        user ? <div className="flex gap-4 items-center">
                            <img src={user.photoURL}
                                className="w-12 h-12 p-1 border-2 border-red-500 shadow-lg rounded-full"
                                alt="" />
                            <button onClick={handleLogOut} className="btn bg-amber-50 border border-amber-600">LogOut</button>
                        </div>
                            :
                            <div className="flex gap-4 items-center">
                                <Link to={'/signUp'}><button className="py-1 px-2 border border-primary rounded-full text-primary font-semibold">Register</button></Link>
                                <Link to={'/login'}><button className="py-1 px-2 border border-primary font-semibold text-white rounded-full bg-primary">Sign in</button></Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;