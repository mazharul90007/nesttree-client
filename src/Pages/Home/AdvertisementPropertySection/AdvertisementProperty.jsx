import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { FaBath, FaBed, FaCar } from "react-icons/fa";


const AdvertisementProperty = () => {
    const axiosPublic = useAxiosPublic();

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/advertisedProperties')
            console.log(res.data)
            return res.data;
        }
    });

    return (
        <div className="my-16">
            <h2 className="text-4xl text-center font-semibold">Prime Properties to Explore</h2>
            <p className="text-xs text-gray-400 italic text-center">Advertisement</p>
            <div className="grid grid-cols-1 md:grid-cols-3 pt-4">
                {
                    properties.map(property =>
                        <div key={property._id} className="max-w-sm rounded-lg">
                            {/* Image Section */}
                            <div className="">
                                <img
                                    src={property.image}
                                    alt="Property"
                                    className="rounded-t-lg w-full object-cover"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xl font-bold">${property.minPrice} - {property.maxPrice}</span>
                                    <span className="badge badge-outline">{property.type}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{property.location}</p>
                                <div className="flex justify-between items-center mt-4 text-gray-500">
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