import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "react-toastify"; // Assuming you use react-toastify for toasts
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { googleSignUp, signIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState(""); // State for form error messages

    const handleGoogleSignUp = () => {
        googleSignUp()
            .then(() => {
                // Google sign-up success
            })
            .catch((error) => {
                toast.error(error.message); // Show toast for error
            });
    };

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

    return (
        <div>
            <Helmet>
                <title>NestTree || LogIn</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-center text-blue-600 font-medium text-sm">
                        Welcome back!
                    </h2>
                    <h1 className="text-center text-2xl font-bold mt-1">Member Login</h1>
                    <p className="text-center text-gray-500 text-sm mt-2">
                        Access to all features. No credit card required.
                    </p>

                    {/* Google Sign-in Button */}
                    <button
                        onClick={handleGoogleSignUp}
                        className="btn btn-outline w-full mt-6 flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="text-2xl" />
                        Sign in with Google
                    </button>

                    {/* Divider */}
                    <div className="divider my-6">Or continue with</div>

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
                        <button className="btn btn-primary w-full">Login</button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to={"/signUp"}
                            className="text-blue-600 font-medium underline hover:text-blue-700"
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
