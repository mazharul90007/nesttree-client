import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { AiOutlineDollar } from "react-icons/ai";


const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: wishlistProperties = [], refetch } = useQuery({
        queryKey: ['wishlistProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allWishlist/${user?.email}`);
            return res.data;
        }
    })

    const handleMakeOffer = (property) => {
        navigate(`/dashboard/wishlist/makeOffer/${property._id}`, {
            state: property
        });
    }

    const handleDeleteWishlistProperty = (property) => {
        console.log(property)

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


                axiosSecure.delete(`/wishlist/${property._id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="my-12">
            <div className=" border border-amber-600 p-4 w-fit flex gap-3 rounded mx-auto  my-10">
                <h2 className="text-2xl md:text-4xl font-semibold border-r-2 border-amber-600 pr-3"> Interested to Buy</h2>
                <p className="text-4xl font-bold text-amber-700">{wishlistProperties.length}</p>
            </div>

            <div className='grid grid-cols-1 my-16 w-11/12 mx-auto'>

                {/* Property Cards */}
                <div className='flex flex-col gap-4'>
                    {
                        wishlistProperties.map(property =>
                            <div key={property._id} className="border-b border-gray-400 flex flex-col md:flex-row gap-4 items-center w-full relative ">
                                {/* Image Section */}
                                <div className=''>
                                    <img
                                        src={property.image}
                                        alt="Property"
                                        className="h-56 w-64 rounded-md"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className='space-y-1 p-2 w-full'>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className='text-xl text-green-600'>
                                            <MdVerifiedUser />
                                        </div>
                                        <button onClick={() => handleDeleteWishlistProperty(property)} className="text-xl text-red-500 p-1 border border-red-500 rounded-full bg-red-50 shadow hover:scale-95 transform transition-transform">
                                            <MdDelete />
                                        </button>

                                    </div>
                                    <h2 className='text-xl font-semibold'>{property.title} <span className="bg-orange-300 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                                        {property.type}
                                    </span></h2>

                                    <p className="text-sm text-gray-500">{property.location}</p>

                                    <div className="text-lg font-semibold italic text-gray-500 flex items-center gap-1">
                                        <AiOutlineDollar />
                                        <p>{property.minPrice} - {property.maxPrice}</p>
                                    </div>

                                    <div className="flex gap-4 mt-3 text-gray-500">
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
                                    <div>
                                        <p className='text-gray-400 text-xs italic mt-4'>Posted By:</p>
                                        <div className="flex items-center gap-2">
                                            <img src={property.agentImage} alt="Agent Image" className='w-8 h-8 rounded-full' />
                                            <h4 className='text-gray-500 text-sm'>Agent: {property.agentName}</h4>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <button onClick={() => handleMakeOffer(property)} className="bg-purple-200 text-orange-700 text-xs font-semibold px-2 py-1 rounded hover:scale-95 transform transition-transform">Make an Offer</button>
                                        <Link to={`propertyDetails/${property.propertyId}`}>
                                            <button className='text-xs text-green-500 p-1 border border-green-500 rounded-md font-medium shadow hover:scale-95 transform transition-transform'>
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Wishlist;