import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "react-toastify"; // Assuming you use react-toastify for toasts
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
    const { signIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState(""); // State for form error messages
    const [credential, setCredential] = useState("");
    const [showCredential, setShowCredential] = useState(false)

    // const handleGoogleSignUp = () => {
    //     googleSignUp()
    //         .then(() => {
    //             // Google sign-up success
    //         })
    //         .catch((error) => {
    //             toast.error(error.message); // Show toast for error
    //         });
    // };

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Attempt to sign in with Firebase
        signIn(email, password)
            .then(() => {
                navigate(from, { replace: true }); // Redirect on success
            })
            .catch((error) => {
                // Extract and handle Firebase errors
                const errorCode = error.code;
                let message = "An error occurred. Please try again.";

                if (errorCode === "auth/user-not-found") {
                    message = "Email not found. Please sign up first.";
                } else if (errorCode === "auth/wrong-password") {
                    message = "Incorrect password. Please try again.";
                } else if (errorCode === "auth/invalid-email") {
                    message = "Invalid email format.";
                }

                setErrorMessage(message); // Update state for inline error display
                toast.error(message); // Optionally show toast
            });
    };

    const credentialHandle = (role) =>{
        setCredential(role)
    }

    return (
        <div>
            <Helmet>
                <title>NestTree || LogIn</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-center text-blue-600 font-medium text-sm">
                        Welcome back!
                    </h2>
                    <h1 className="text-center text-2xl font-bold mt-1">Member Login</h1>
                    <p className="text-center text-gray-500 text-sm mt-2">
                        Access to all features. No credit card required.
                    </p>

                    {/* Google Sign-in Button */}
                    <SocialLogin></SocialLogin>
                    {/* Divider */}
                    <div className="divider mt-6">Or continue with</div>

                    {/* Demo Credential */}
                    <button onClick={()=> setShowCredential(!showCredential)} className=" mb-3 py-2 px-3 border border-amber-500 rounded flex mx-auto shadow text-gray-500 bg-amber-50">
                        {showCredential ? 'Hide Credentials' : 'Show Demo Credentials'}
                    </button>

                    {/* Credential box */}
                    <div className={`${showCredential? 'grid grid-cols-12 border p-2 gap-2 rounded-lg': 'hidden'}`}>
                        <div className="col-span-4 flex flex-col gap-1 text-gray-500">
                            <button onClick={()=>credentialHandle("user")} className="btn-sm bg-amber-100 text-sm font-semibold hover:bg-amber-500 hover:scale-105 transition-transform transform duration-200">User</button>
                            <button onClick={()=>credentialHandle("agent")} className="btn-sm bg-amber-200 text-sm font-semibold hover:bg-amber-500 hover:scale-105 transition-transform transform duration-200">Agent</button>
                            <button onClick={()=>credentialHandle("admin")} className="btn-sm bg-amber-300 text-sm font-semibold hover:bg-amber-500 hover:scale-105 transition-transform transform duration-200">Admin</button>
                        </div>
                        <div className="col-span-8 border-l pl-2 flex items-center text-gray-600">
                            {
                                credential === 'user' ? 
                                <div>
                                    <p className="text-center text-xs italic font-semibold text-gray-400 divider p-0 m-0">USER</p>
                                    <p>Email: sabbir@gmail.com</p>
                                    <p>Password: @Sourabh</p>
                                </div>
                                :
                                credential === 'agent' ?
                                <div>
                                    <p className="text-center text-xs italic font-semibold text-gray-400 divider p-0 m-0">AGENT</p>
                                    <p>Email: sehjad@gmail.com</p>
                                    <p>Password: @Sourabh</p>
                                </div>
                                :
                                credential === 'admin' ?
                                <div>
                                    <p className="text-center text-xs italic font-semibold text-gray-400 divider p-0 m-0">ADMIN</p>
                                    <p>Email: sourabh@gmail.com</p>
                                    <p>Password: @Sourabh</p>
                                </div>
                                :
                                <div>
                                    <p>Click any role to see the login credentials</p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Email address *</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Password *</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="************"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Inline Error Message */}
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}

                        {/* Submit Button */}
                        <button className="py-2 px-3 border rounded-lg w-full bg-primary text-white">Login</button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to={"/signUp"}
                            className="text-amber-600 font-semibold underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
