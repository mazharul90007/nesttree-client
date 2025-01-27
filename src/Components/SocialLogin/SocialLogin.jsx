import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SocialLogin = () => {
    const { googleSignUp } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignUp = () => {
        googleSignUp()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                };
                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                console.log(res.data);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error("Google sign-in failed. Please try again.");
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignUp}
                aria-label="Sign Up with Google"
                className="btn btn-outline w-10/12 mx-auto mt-6 flex items-center justify-center gap-2"
            >
                <FcGoogle className="text-2xl" />
                Sign Up with Google
            </button>
        </div>
    );
};

export default SocialLogin;
