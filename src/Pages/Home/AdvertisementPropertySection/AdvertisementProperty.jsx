import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { FaBath, FaBed, FaCar, FaHome } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";


const AdvertisementProperty = () => {
    const axiosPublic = useAxiosPublic();
    const {dayTheme} = useAuth();

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/advertisedProperties')
            // console.log(res.data)
            return res.data;
        }
    });

    return (
        <div className="mb-8 md:mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-2">Prime Properties to Explore</h2>
            <p className="text-xs text-gray-400 italic text-center mt-2">Advertisement</p>
            <div className="divider text-3xl"><FaHome /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-10">
                {
                    properties.slice(0,6).map(property =>
                        <div key={property._id} className={`rounded-lg shadow ${!dayTheme && 'bg-gray-600 text-gray-200'}`}>
                            {/* Image Section */}
                            <div className="">
                                <img
                                    src={property.image}
                                    alt="Property"
                                    className="rounded-t-lg w-full object-cover h-96"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xl font-bold">${property.minPrice} - {property.maxPrice}</span>
                                    <span className="badge badge-outline">{property.type}</span>
                                </div>
                                <p className={`${dayTheme ? 'text-gray-600' : 'text-gray-200'} text-sm`}>{property.location}</p>
                                <div className={`flex justify-between items-center mt-4 ${dayTheme ? 'text-gray-500' : 'text-gray-200'}`}>
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <FaBed className="mr-1" /> {property.bed}
                                        </span>
                                        <span className="flex items-center">
                                            <FaBath className="mr-1" /> {property.bath}
                                        </span>
                                        <span className="flex items-center">
                                            <FaCar className="mr-1" /> {property.parking}
                                        </span>
                                    </div>
                                    <button className="text-lg text-gray-500 hover:text-gray-700">
                                    <AiTwotoneSafetyCertificate />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdvertisementProperty;