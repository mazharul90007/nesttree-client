import { FaBook, FaCalendarAlt, FaHome, FaList, FaListAlt, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { GoCodeReview } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
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
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/dashboard/adminHome'}><FaHome></FaHome> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/addItems'}><FaUtensils /> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageItems'}><FaList /> Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/bookings'}><FaBook />Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}><FaUsers />
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            isAgent ?
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/agentProfile'}><FaHome></FaHome> Agent Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/addItems'}><FaUtensils /> Add Property</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/addedProperties'}><FaList /> My added Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/soldProperties'}><FaBook />My Sold Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/requestedProperties'}><FaUsers />
                                            Requested Properties</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <NavLink to={'/dashboard/userHome'}><FaHome></FaHome> User Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/reservation'}><FaCalendarAlt /> Reservation</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/paymentHistory'}><FaWallet /> Payment History</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/cart'}><FaShoppingCart />  My Cart</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/review'}><GoCodeReview />  Add Review</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/mybookings'}><FaListAlt />  My Bookings</NavLink>
                                    </li>
                                </>
                    }

                    {/* Shared Nav Links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}><GiHamburgerMenu />Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/shop'}><FaShoppingBag />Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}><IoMdMail />
                            Contact</NavLink>
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