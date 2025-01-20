import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import useVerifiedProperties from "../../../Hooks/useVerifiedProperties";
import { MdVerifiedUser } from "react-icons/md";



const LatestProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();


    return (
        <div className="my-12">

            <div className='grid md:grid-cols-12 my-16 w-11/12 mx-auto'>

                {/* Property Cards */}
                <div className='md:col-span-9 flex flex-col gap-4'>
                    {
                        verifiedProperties.map(property =>
                            <div key={property._id} className="border-b border-gray-400 flex flex-col md:flex-row gap-4 items-center w-full relative p-2">
                                {/* Image Section */}
                                <div className='absolute top-2 right-2 text-xl text-green-600'>
                                    <MdVerifiedUser />
                                </div>

                                <button className='absolute bottom-2 right-2 text-xs text-green-500 p-1 border border-green-500 rounded-md font-medium shadow hover:scale-95 transform transition-transform'>
                                    Details
                                </button>

                                <div className=''>
                                    <img
                                        src={property.image}
                                        alt="Property"
                                        className="h-56 w-64 rounded-md"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className='space-y-1 p-2'>
                                    <h2 className='text-xl font-semibold'>{property.title} <span className="bg-orange-300 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                                        {property.type}
                                    </span></h2>

                                    <p className="text-sm text-gray-500">{property.location}</p>

                                    <div className="text-lg font-semibold italic text-gray-500 flex items-center gap-1">
                                        <TbCoinTaka />
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
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Ad Section */}
                <div className='md:col-span-3'>

                </div>
            </div>
        </div>
    );
};

export default LatestProperties;