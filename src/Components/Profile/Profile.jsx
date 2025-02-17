import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            // console.log(res.data)
            return res?.data;

        }
    })
    return (
        <div>
            <div className="border p-10">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-48 h-48">
                        <img src={user?.photoURL} alt="Profile Pic" className="w-48 h-48 rounded-full" />
                    </div>
                    <h2 className="text-4xl font-semibold uppercase">{user?.displayName}</h2>
                    <p className="text-xl text-gray-400 font-semibold uppercase">
                        {
                            userProfile?.role ? `${userProfile.role}` : ''
                        }
                    </p>
                    <div className="mt-10">
                        <p>Profession: {userProfile?.profession ? userProfile.profession : 'Unknown'}</p>
                        <p>Address: {userProfile?.address ? userProfile.address : 'Unknown'}</p>
                        <p>Phone Number: {userProfile?.phone ? userProfile.phone : 'Unknown'}</p>
                        <p>Email: {userProfile?.email ? userProfile.email : 'Unknown'}</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Profile;