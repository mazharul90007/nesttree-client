import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import logo from "../../assets/icons/logo.png"



const Registration = () => {

    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            // Create user with email & password
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
    
            // Update User Name and Profile
            await updateUserProfile(data.name, data.photoURL || "");
    
            // Save User to Database
            const userInfo = { name: data.name, email: data.email, uid: loggedUser.uid };
            const res = await axiosPublic.post('/users', userInfo);
    
            if (res.data.insertedId) {
                reset(); // Reset form after success
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.error("Registration failed:", error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "An unexpected error occurred. Please try again.",
            });
        }
    };
    
    

    return (
        <div className="pt-16">
            <Helmet>
                <title>Nestree || SignUp</title>
            </Helmet>
            <div className="md:w-8/12 mx-auto flex items-center justify-center min-h-screen rounded-lg">
                <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-12 items-center justify-center">

                    {/* Left Side */}
                    <div className="md:col-span-5 bg-blue-200 h-full px-4 py-8 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-1 mb-8">
                            <img className="h-12 w-12" src={logo} alt="Logo" />
                            <p className="text-3xl text-primary font-bold hidden md:block"> NestTree</p>
                        </div>
                        <p className="text-center text-gray-600 font-medium">Login with social media to get quick access</p>
                        {/* Google Sign-in Button */}
                        <SocialLogin></SocialLogin>
                    </div>

                    {/* Right Side */}
                    <div className="md:col-span-7 bg-white p-8">
                        <h1 className="text-center text-2xl font-bold mt-1">Create Account</h1>
                        <p className="text-center text-gray-500 text-sm mt-2">
                            Access to all features. No credit card required.
                        </p>

                        <div className="divider">*</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="pt-0">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"
                                    placeholder="name"
                                    {...register("name", { required: true })}
                                    className="input input-bordered" />
                                {errors.name && <span className="text-red-600">*Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoUrl</span>
                                </label>
                                <input type="text"
                                    placeholder="photo URL"
                                    {...register("photoURL", { required: true })}
                                    className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">*PhotoURL is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    placeholder="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    className="input input-bordered" />
                                {errors.email && <span className="text-red-600">*Email is required</span>}
                            </div>
                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Password</span></label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        validate: {
                                            hasUppercase: (value) => /[A-Z]/.test(value) || "Must have at least one uppercase letter",
                                            hasSpecialChar: (value) => /[@$!%*?&]/.test(value) || "Must have at least one special character",
                                        },
                                    })}
                                    className="input input-bordered"
                                />
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>

                            <div className="form-control mt-6">
                                <button className="py-2 px-3 border rounded-lg w-full bg-primary text-white">Sign Up</button>
                            </div>
                        </form>
                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-500 mt-2">
                            Already have an account?{" "}
                            <Link
                                to={'/login'}
                                className="text-amber-600 font-semibold underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;