import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AiOutlineDollar } from "react-icons/ai";


const MyAddedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: addedProperties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties/${user.email}`)
            return res.data;
        }
    });

    const handleDeleteProperty = (property) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/properties/${property._id}`)
                    .then(res => {
                        const data = res.data;
                        console.log(res.data)
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: 'Property has been deleted',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h2>Total Added property: {addedProperties.length}</h2>
            <div className="flex flex-col gap-2">
                {
                    addedProperties.map(property =>
                        <div key={property._id} className="bg-base-100 rounded-lg shadow p-2 flex flex-col md:flex-row gap-4 w-full">
                            {/* Image Section */}
                            <div className=''>
                                <img
                                    src={property.image}
                                    alt="Property"
                                    className="h-32 w-32 rounded-lg"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold">{property.title}</h3>

                                        <p className="text-sm text-gray-500">{property.location}</p>
                                        <div className="flex gap-4 text-gray-500">
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaBed /> 3 beds
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaBath /> 2 baths
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaCarAlt /> 2 spaces
                                            </div>
                                        </div>
                                        <div className="text-gray-500 flex items-center gap-1">
                                            <AiOutlineDollar />
                                            <p>{property.minPrice} - {property.maxPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-sm text-gray-400 italic ">Posted by:</p>
                                        <img src={property.agentImg} className="w-10 h-10 rounded-full" alt="" />
                                        <p className="text-gray-500">{property.agentName}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="mt-2 flex gap-2">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${property.status === "verified"
                                            ? "bg-green-300 text-green-700"
                                            : property.status === "pending"
                                                ? "bg-yellow-300 text-yellow-700"
                                                : property.status === "rejected"
                                                    ? "bg-red-300 text-red-700"
                                                    : "bg-gray-300 text-gray-700"
                                            }`}>
                                            {property.status
                                                ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
                                                : "Unknown"}
                                        </span>

                                    </div>
                                    <div className="flex items-center gap-3 text-2xl">
                                        {
                                            property?.status !== 'rejected' && (
                                                <Link to={`/dashboard/updateProperty/${property._id}`}>
                                                    <div className={`border p-1 rounded-full shadow-md cursor-pointer text-green-600 border-green-600`}><MdModeEdit /></div>
                                                </Link>
                                            )
                                        }

                                        <div onClick={() => handleDeleteProperty(property)} className="border border-red-600 p-1 rounded-full text-red-600 shadow-md cursor-pointer"><MdDelete /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyAddedProperties;