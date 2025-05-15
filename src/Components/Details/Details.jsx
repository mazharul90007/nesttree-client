import PropTypes from "prop-types";
import { FaArrowRight, FaBan, FaCheckCircle } from "react-icons/fa";
import bed from '../../assets/icons/bed.png'
import bath from '../../assets/icons/bath.png'
import parking from '../../assets/icons/parking.png'
import living from '../../assets/icons/living.png'
import calender from '../../assets/icons/calender.png'
import space from '../../assets/icons/space.png'
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineDollar } from "react-icons/ai";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from 'react-toastify';
import { IoCall, IoChatbubbles, IoStar, IoWarning } from "react-icons/io5";
import { GoDot } from "react-icons/go";

const Details = ({ property }) => {
    const { user, dayTheme } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    // console.log(property)

    const { data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email, property?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlist`, {
                params: {
                    userEmail: user.email,
                    propertyId: property._id,
                },
            });
            // console.log(wishlist)
            return res.data;
        },
    });

    const handleAddToWishlist = async (property) => {
        if (user?.email) {
            const { _id, ...wishlistProperty } = property;
            wishlistProperty.userEmail = user.email;
            wishlistProperty.propertyId = _id;  

            // console.log(wishlistProperty);

            try {
                const wishlistRes = await axiosSecure.post('/wishlist', wishlistProperty);
                if (wishlistRes.data.insertedId) {

                    // Show success popup
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'The Property has been added to Wishlist',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error("Error adding to wishlist:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Failed to add the property to the wishlist. Please try again later."
                });
            }
        } else {
            toast.error("To add to Wishlist Login first")
        }

    };

    return (
        <div>
            <div className={`grid w-11/12 mx-auto ${!dayTheme && 'text-gray-400'}`}>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
                        <div className="col-span-9">
                            {/* Property Title */}
                            <h3 className="text-3xl font-semibold">{property.title}</h3>
                            {/* Location */}
                            <p>{property.location}</p>
                        </div>
                        <div className="col-span-3">
                            {/* Verification Status and WishList */}
                            <div className="flex gap-4 items-center justify-end">
                                <div className="text-green-600 flex items-center gap-1">
                                    <FaCheckCircle /> <span>Verified</span>
                                </div>
                                <div>
                                    {
                                        wishlist?.userEmail === user?.email && wishlist?.propertyId === property._id
                                            ?
                                            <p className="text-green-600 border p-1 border-green-600 rounded">You have already added this Property in your Wishlist</p>
                                            :
                                            <button
                                                onClick={() => handleAddToWishlist(property)}
                                                className="font-medium flex items-center gap-1 text-gray-600"
                                            >
                                                <IoStar /> Save Ad
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
                        {/* Left side */}
                        <div className="flex flex-col w-full lg:col-span-9">
                            {/* Image */}
                            <img src={property.image} alt="Property Image" className="h-[550px] w-full rounded-lg" />
                            {/* Price */}
                            <div className="text-xl md:text-2xl font-semibold text-primary flex items-center gap-1 justify-end my-2">
                                <AiOutlineDollar />
                                <p>TK {property.minPrice} / Month</p>
                            </div>
                            {/* Property Details */}
                            <div>
                                <div className="mb-6 flex flex-wrap gap-2 bg-white p-4 rounded-md shadow">
                                    {/* Bed */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={bed} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Bed Rooms</p>
                                            <p className="text-4xl font-bold text-center">{property.bed}</p>
                                        </div>
                                    </div>
                                    {/* Bath */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={bath} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Bath Rooms</p>
                                            <p className="text-4xl font-bold text-center">{property.bath}</p>
                                        </div>
                                    </div>
                                    {/* Parking */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={parking} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Parking</p>
                                            <p className="text-4xl font-bold text-center">{property.parking}</p>
                                        </div>
                                    </div>
                                    {/* Living Room */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={living} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Living Room</p>
                                            <p className="text-4xl font-bold text-center">{property.livingRoom}</p>
                                        </div>
                                    </div>
                                    {/* Dining Room */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={living} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Dining Room</p>
                                            <p className="text-4xl font-bold text-center">{property.diningRoom}</p>
                                        </div>
                                    </div>
                                    {/* Built Year */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={calender} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Built Year</p>
                                            <p className="text-4xl font-bold text-center">{property.builtYear}</p>
                                        </div>
                                    </div>
                                    {/* Space */}
                                    <div className={`flex items-center gap-1 border border-gray-400 w-fit p-1 rounded ${!dayTheme && 'bg-gray-700'}`}>
                                        <img src={space} alt="Bed" className="w-12 h-12" />
                                        <div>
                                            <p>Space sqft</p>
                                            <p className="text-4xl font-bold text-center">{property.space}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-md shadow-md p-4">
                                    <p className="text-xl font-semibold">Property Description: <br /><span className="text-gray-500 text-lg font-normal">{property.propertyDetails}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side detais */}
                        <div className="lg:col-span-3 flex flex-col flex-grow">
                            <div className="border border-gray-300 rounded">
                                {/* Agent */}
                                <div className="p-3">
                                    <p className="mt-2 text-gray-500 italic">Posted By: <span className="text-gray-600 font-bold">{property.agentName}</span></p>
                                </div>
                                <div className="flex gap-3 items-start p-3 border-y border-gray-300">
                                    <div className="p-1 border border-primary rounded-full text-primary">
                                        <IoCall />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-600">Call Owner</p>
                                        <p className="font-bold text-gray-600 py-0.5 px-2 border border-gray-400 rounded mt-1 bg-gray-50">{property?.contact ? property.contact : "Invalid"}</p>
                                    </div>
                                </div>
                                <button className="flex gap-3 items-start p-3 cursor-pointer w-full hover:bg-gray-300 transition-transform duration-300">
                                    <div className="p-1 border border-primary rounded-full text-primary">
                                        <IoChatbubbles />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-600">Chat</p>
                                    </div>
                                </button>
                            </div>
                            {/* Safety Warning */}
                            <div className="mt-auto bg-white p-4 rounded-md shadow-md">
                                <div className="text-lg font-semibold flex items-center gap-2 mb-3">
                                    <IoWarning className="text-primary"/>
                                    <p><span className="text-primary">Warning</span>: Avoid Online Scams</p>
                                </div>
                                <div className="mb-2">
                                    <p className="flex items-start gap-1"><span><GoDot /></span>Don’t go to unfamiliar places alone</p>

                                    <p className="flex items-start gap-1"><span><GoDot /></span>Don’t make full payment to 3rd parties</p>
                                </div>
                                <button className="cursor-pointer text-blue-500 flex gap-2 items-center">See all safety tips <span><FaArrowRight /></span></button>
                            </div>

                        </div>
                    </div>
                    {/* Report */}
                    <div className="py-4 border-t border-gray-300">
                        <button className="flex gap-2 items-center text-lg text-gray-600 mx-auto w-fit cursor-pointer">
                            <FaBan />
                            <p>Report this ad</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Details;

Details.propTypes = {
    property: PropTypes.object
}