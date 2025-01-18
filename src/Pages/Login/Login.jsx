import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";


const Login = () => {

    const { googleSignUp, signIn } = useAuth();

    const handleGoogleSignUp = () => {
        googleSignUp()
            .then(() => {
                // console.log(result)
            })
            .catch(() => {
                // console.log(error)
            })
    }

    const location = useLocation();
    const navigate = useNavigate();
    // console.log('sign in page', location)
    const from = location.state || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // const user = {email, password}
        // console.log(user);

        signIn(email, password)
            .then(() => {
                navigate(from)
            })
            .catch(() => {
                // console.log(error);
            })

    }

    return (
        <div>
            <Helmet>
                <title>NestTree | SignUp</title>
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
                    <button onClick={handleGoogleSignUp} className="btn btn-outline w-full mt-6 flex items-center justify-center gap-2">
                        <FcGoogle className="text-2xl" />
                        Sign in with Google
                    </button>

                    {/* Divider */}
                    <div className="divider my-6">Or continue with</div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                        {/* Username/Email Input */}
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Username or Email address *</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
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
                            />
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between mb-6">
                            <div
                                href=""
                                className="text-sm text-blue-600 hover:underline font-medium cursor-pointer"
                            >
                                Forgot Password
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="btn btn-primary w-full">Login</button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to={'/signUp'}
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