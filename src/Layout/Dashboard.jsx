import { FaBullhorn, FaCalendarAlt, FaHome, FaList, FaShoppingCart, FaUsers, FaWallet } from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import useAdmin from "../Hooks/useAdmin";
import useAgent from "../Hooks/useAgent";
import logo from "../assets/icons/logo.png"
import useAuth from "../Hooks/useAuth";



const Dashboard = () => {
    //TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    const { user } = useAuth();

    return (
        <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Dashboard SideBar */}
            <div className="md:col-span-3 md:min-h-screen bg-orange-100 px-4">
                <Link to={'/'}>
                    <div className="flex items-center justify-center gap-1 pt-4">
                        <img className="h-8 w-8" src={logo} alt="Logo" />
                        <p className="text-2xl text-primary font-bold"> NestTree</p>
                    </div>
                </Link>
                <div className="divider"></div>
                {/* User Profile */}
                <div className="flex flex-col items-center space-y-2 mb-4 text-center">
                    <img src={user?.photoURL} alt="User Image" className="w-24 h-24 rounded-lg" />
                    <h3 className="text-2xl font-bold">{user?.displayName}</h3>
                    <p className="font-semibold text-gray-500">{user?.email}</p>
                </div>
                <div className="divider"></div>
                <ul className="menu space-y-4 text-lg font-semibold">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/dashboard/adminProfile'}><IoPerson /> Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageProperties'}><FaHome></FaHome> Manage Properties</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}><FaUsers />
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageReviews'}><FaList /> Manage Reviews</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/advertiseProperty'}><FaBullhorn /> Advertise Property</NavLink>
                            </li>

                        </>
                            :
                            isAgent ?
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/agentProfile'}><IoPerson /> Agent Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/addProperty'}><TbHomePlus /> Add Property</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/addedProperties'}><FaList /> My added Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/soldProperties'}><HiCurrencyDollar />My Sold Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/requestedProperties'}><FaHouseCircleExclamation />
                                            Requested Properties</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/userProfile'}><IoPerson /> My Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/wishlist'}><FaCalendarAlt /> Wishlist</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/propertyBought'}><FaWallet /> Property Bought</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/myReview'}><FaShoppingCart />  My Review</NavLink>
                                    </li>
                                </>
                    }

                    {/* Shared Nav Links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/support'}><IoMdMail />
                            Support</NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-2 md:col-span-9 bg-blue-50">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;