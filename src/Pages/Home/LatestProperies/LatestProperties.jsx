import { FaBath, FaBed, FaCarAlt, FaHome } from "react-icons/fa";
import useVerifiedProperties from "../../../Hooks/useVerifiedProperties";
import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineDollar } from "react-icons/ai";
import robi from "../../../assets/ads/robi.gif";
import bata from "../../../assets/ads/bata.gif";
import useAuth from "../../../Hooks/useAuth";



const LatestProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();
    const {user, dayTheme} = useAuth();
    // console.log(verifiedProperties)


    return (
        <div className='my-20'>

            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-2">Featured Properties - Explore Our Latest Listings</h2>
            <p className="w-10/12 text-center text-xl md:text-2xl font-medium mx-auto text-gray-500"> Discover the finest homes and investment opportunities with our most recent property additions.</p>
            <div className="divider text-3xl"><FaHome /></div>

            <div className='grid md:grid-cols-12 my-10 gap-4'>
                <div className="md:col-span-9">
                    {/* Property Cards */}
                    <div className=' flex flex-col gap-4'>
                        {
                            verifiedProperties.slice(0, 6).map(property =>
                                <div key={property._id} className={`border-b border-gray-400 flex flex-col md:flex-row gap-4 items-center w-full relative py-4 ${!dayTheme && 'bg-gray-600 shadow'} rounded `}>
                                    {/* Image Section */}
                                    <div className='absolute top-2 right-2 text-xl text-green-600'>
                                        <MdVerifiedUser />
                                    </div>

                                    <Link to={`propertyDetails/${property._id}`}>
                                        <button className='absolute bottom-2 right-2 text-xs text-green-500 p-1 border border-green-500 rounded-md font-medium shadow hover:scale-95 transform transition-transform'>
                                            Details
                                        </button>
                                    </Link>

                                    <div className=''>
                                        <img
                                            src={property.image}
                                            alt="Property"
                                            className="h-56 w-64 rounded-md"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className={`space-y-1 p-2 ${!dayTheme && 'text-white'}`}>
                                        <h2 className='text-xl font-semibold'>{property.title} <span className="bg-orange-300 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                                            {property.type}
                                        </span></h2>

                                        <p className={`text-sm ${dayTheme ? 'text-gray-500' : 'text-gray-200'}`}>{property.location}</p>

                                        <div className={`text-lg font-semibold italic flex items-center gap-1 ${dayTheme ? 'text-gray-500 ' : 'text-gray-200'}`}>
                                            <AiOutlineDollar />
                                            <p>{property.minPrice} - {property.maxPrice}</p>
                                        </div>

                                        <div className={`flex gap-4 mt-3 ${dayTheme ? 'text-gray-500' : 'text-gray-200'}`}>
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaBed /> {property.bed} beds
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaBath /> {property.bath} baths
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaCarAlt /> {property.parking} spaces
                                            </div>
                                        </div>
                                        <div className={`${dayTheme ? 'text-gray-500' : 'text-gray-200'}`}>
                                            <p className='text-xs italic mt-4'>Posted By:</p>
                                            <div className="flex items-center gap-2">
                                                <img src={property.agentImage} alt="Agent Image" className='w-8 h-8 rounded-full' />
                                                <h4 className='text-sm'>Agent: {property.agentName}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex justify-center">
                        <Link to={ user?.email ? '/allProperties' : '/login'}>
                            <button className="w-fit mt-10 py-1 px-2 border border-amber-500 rounded  bg-amber-50 shadow hover:scale-95 transition-transform transform">View All</button>
                        </Link>
                    </div>
                </div>

                {/* Ad Section */}
                <div className='md:col-span-3 px-2'>
                    <div>
                        <img src={robi} alt="Ad" className="w-full h-auto" />
                    </div>
                    <div>
                        <img src={bata} alt="Ad" className="w-full h-auto my-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProperties;