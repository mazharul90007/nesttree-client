import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { authContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Registration = () => {

    const { googleSignUp, createUser, updateUser } = useContext(authContext);

    const handleGoogleSignUp = ()=>{
        googleSignUp()
        .then(() =>{
            // console.log(result)
        })
        .catch(() =>{
            // console.log(error)
        })
    }

    const handleform = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        

        // const user = { name, photo, email, password}
        // console.log(user);

        createUser(email, password)
            .then(() => {
                // console.log(res.user)

                updateUser(name, photo)
                    .then(() => {
                        // console.log('Photo updated Successfully')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Registration Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(() => {
                        // console.log(error)
                    })

            })
            .catch(() => {
                // console.log(error)
            })

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-center text-xl font-semibold text-primary mb-2">
                    Register
                </h1>
                <h2 className="text-center text-3xl font-bold mb-2">
                    Start for free Today
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Access to all features. No credit card required.
                </p>
                <button onClick={handleGoogleSignUp} className="btn btn-outline btn-primary w-full mb-4 flex items-center justify-center">
                    <FcGoogle className="w-6 h-6 mr-2" />
                    Sign up with Google
                </button>
                <div className="divider">Or continue with</div>
                <form onSubmit={handleform}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Full Name *</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Steven Job"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">PhotoURL *</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Your PhotoUrl"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email *</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="stevenjob@gmail.com"
                            className="input input-bordered w-full"
                        />
                    </div>
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
                    <button className="btn btn-primary w-full">
                        Submit & Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link
                        to={"/signin"}
                        className="text-primary font-semibold underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;