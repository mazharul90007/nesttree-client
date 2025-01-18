import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const SocialLogin = () => {
    const { googleSignUp } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignUp = ()=>{
        googleSignUp()
        .then(result =>{
            console.log(result.user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                const data = res.data;
                console.log(data);
                navigate('/');
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <div>
                <button onClick={handleGoogleSignUp} className="btn w-full">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;