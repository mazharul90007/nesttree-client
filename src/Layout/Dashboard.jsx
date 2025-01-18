import { FaCalendarAlt, FaHome, FaList, FaShoppingCart, FaUsers, FaWallet } from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import useAdmin from "../Hooks/useAdmin";
import useAgent from "../Hooks/useAgent";



const Dashboard = () => {
    //TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();

    return (
        <div className="flex">
            {/* Dashboard SideBar */}
            <div className="w-64 min-h-screen bg-orange-200">
                <ul className="menu space-y-4 text-md font-semibold">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/dashboard/adminProfile'}><IoPerson /> Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/addItems'}><FaHome></FaHome> Manage Properties</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}><FaUsers />
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageItems'}><FaList /> Manage Reviews</NavLink>
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
                        <NavLink to={'/contact'}><IoMdMail />
                            Support</NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;