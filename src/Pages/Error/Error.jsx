import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import pageNotFound from "../../../public/404.json"


const Error = () => {
    return (
        <div className="text-center my-6 max-h-screen">
            <div >
                <Lottie animationData={pageNotFound} className="h-[500px]"></Lottie>
            </div>
            <Link to={'/'}><button className="btn btn-warning">Go Home</button></Link>
        </div>
    );
};

export default Error;