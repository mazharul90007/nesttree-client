import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";


const PropertyBought = () => {

    const axiosSecure = useAxiosSecure();
    const { user, setAmount, amount } = useAuth();
    const navigate = useNavigate();

    const { data: requestedProperties = [], } = useQuery({
        queryKey: ['requestedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myRequestedOffer/${user.email}`)
            console.log(res.data)
            return res.data;
        }
    });

    const handleMakePayment = (property) => {
        navigate('payment', {state: {property}});
        // const amountInUSD = (parseInt(property.offerPrice) / 100)
       setAmount(property.offerPrice)
        // setAmount(amountInUSD)
    }
    console.log(amount)

    return (
        <div>
            <h3>This is my Offered Property</h3>
            <div className="my-12">

                <div className='grid grid-cols-1 my-16 w-11/12 mx-auto'>

                    {/* Property Cards */}
                    <div className='flex flex-col gap-4'>
                        {
                            requestedProperties.map(property =>
                                <div key={property._id} className="border-b border-gray-400 flex flex-col md:flex-row gap-4 items-center w-full relative ">
                                    {/* Image Section */}
                                    <div className=''>
                                        <img
                                            src={property.propertyImage}
                                            alt="Property"
                                            className="h-56 w-64 rounded-md"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className='space-y-1 p-2 w-full'>
                                        <div className="mb-2">
                                            <div className='text-xl text-green-600'>
                                                <MdVerifiedUser />
                                            </div>
                                            {/* <button onClick={() => handleDeleteWishlistProperty(property)} className="text-xl text-red-500 p-1 border border-red-500 rounded-full bg-red-50 shadow hover:scale-95 transform transition-transform">
                                                <MdDelete />
                                            </button> */}

                                        </div>
                                        <h2 className='text-xl font-semibold'>{property.title}</h2>

                                        <p className="text-sm text-gray-500">{property.location}</p>

                                        <div className="text-lg font-semibold italic text-gray-500 flex items-center gap-1">
                                            <AiOutlineDollar />
                                            <p>{property.offerPrice}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-400 text-xs italic mt-4'>Posted By:</p>
                                            <div className="">
                                                <h4 className='text-gray-500 text-sm'>Agent: {property.agentName}</h4>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <div>
                                                {
                                                    property.status === "pending" ?
                                                        <p className="bg-orange-200 text-amber-700 py-1 px-2 border border-amber-200 rounded">Pending</p>
                                                        : property.status === "accepted" ?
                                                            (
                                                                <div  className="flex gap-3 items-center">
                                                                    <p className="bg-green-200 text-amber-700 py-1 px-2 border border-amber-200 rounded w-fit">Accepted</p>

                                                                    <button onClick={() => handleMakePayment(property)} className="bg-purple-200 text-orange-700 font-semibold px-2 py-1 rounded hover:scale-95 transform transition-transform">Make Payment</button>
                                                                </div>
                                                            )
                                                            :
                                                            <p className="bg-red-200 text-amber-700 py-1 px-2 border border-amber-200 rounded">Rejected</p>
                                                }
                                            </div>

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
        </div>
    );
};

export default PropertyBought;