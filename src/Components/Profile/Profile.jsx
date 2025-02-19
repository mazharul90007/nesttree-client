import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";


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
    console.log(userProfile)
    return (
        <div className="flex flex-col gap-4">
            <div className="p-8 bg-base-100 shadow-md space-y-2">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <h3 className="text-2xl font-bold">{user?.displayName}</h3>
                        <p className="py-1 px-2 bg-amber-400 rounded text-white font-bold">{userProfile?.role}</p>
                    </div>
                    <button className="py-1 px-3 bg-red-100 rounded text-red-500 font-bold hidden">
                        Edit
                    </button>
                </div>
                <div className="text-gray-500 font-medium flex items-center space-x-4">
                    <div className="flex items-center gap-1">
                        <LuMapPin />
                        <span>{userProfile?.address ? userProfile.address : 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LuMail />
                        <span>{userProfile?.email ? userProfile.email : 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LuPhone />
                        <span>{userProfile?.phone ? userProfile.phone : 'Unknown'}</span>
                    </div>
                </div>
            </div>
            <div className="p-8 bg-base-100 shadow-md space-y-8">
                {/* About */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">About</h3>
                    {/* Gender */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Gender:</p>
                        <p className="col-span-10 text-gray-500">{userProfile?.gender ? userProfile.gender : 'Unknown'}</p>
                    </div>

                    {/* Birthday */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Birthday:</p>
                        <p className="col-span-10 text-gray-500">{userProfile?.birthday ? userProfile.birthday : 'Unknown'}</p>
                    </div>

                    {/* Phone No */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Phone No:</p>
                        <p className="col-span-10 text-red-500">{userProfile?.phone ? userProfile.phone : 'Unknown'}</p>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Address:</p>
                        <p className="col-span-10 text-gray-500">{userProfile?.address ? userProfile.address : 'Unknown'}</p>
                    </div>
                </div>

                {/* Login Details */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Login Details</h3>
                    {/* Email */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Email:</p>
                        <p className="col-span-10 text-red-500">{userProfile?.email ? userProfile.email : 'Unknown'}</p>
                    </div>
                    {/* Password */}
                    <div className="grid grid-cols-12 font-medium">
                        <p className="col-span-2 text-gray-600">Password:</p>
                        <p className="col-span-10 text-red-500">******</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;