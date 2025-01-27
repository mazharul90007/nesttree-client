import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import signUp from "../../../public/signup.json"
import Lottie from "lottie-react";



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

    const onSubmit = (data) => {
        // console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)

                //Update User Name and PhotoURL
                updateUserProfile(data.name, data.photoURL)
                    .then(() => { })
                    .catch(() => { })

                //create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    uid: loggedUser.uid

                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        const data = res.data;
                        if (data.insertedId) {
                            console.log('user added to the database');
                            reset();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Registration Successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                    })
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })

    };

    return (
        <div className="pt-16">
            <Helmet>
                <title>Nestree || SignUp</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="text-center md:col-span-1">
                        <Lottie animationData={signUp}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full md:w-10/12 mx-auto shadow-md md:col-span-1 py-8">
                        <h1 className="text-center text-2xl font-bold mt-1">Create Account</h1>
                        <p className="text-center text-gray-500 text-sm mt-2">
                            Access to all features. No credit card required.
                        </p>
                        {/* Google Sign-in Button */}
                        <SocialLogin></SocialLogin>
                        <div className="divider">OR</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0">
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
                                {errors.name && <span className="text-red-600">*Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    placeholder="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
                                    })}
                                    name="password"
                                    className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be at least 6 character</p>
                                )}

                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less than 20 character</p>
                                )}

                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must have at least a lowercase, a uppercase and a special character</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-500 ">
                            Already have an account?{" "}
                            <Link
                                to={'/login'}
                                className="text-blue-600 font-medium underline hover:text-blue-700"
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