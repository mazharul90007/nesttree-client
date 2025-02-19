import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import useAuth from "../Hooks/useAuth";


const MainLayout = () => {
    const { dayTheme } = useAuth()
    return (
        <div className={`${dayTheme ? 'bg-[#F6EEE4]' : 'bg-gray-800'}`}>
            <div className="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;