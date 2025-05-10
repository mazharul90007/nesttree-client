import { FaBath, FaBed, FaCarAlt, FaHome } from "react-icons/fa";
import useVerifiedProperties from "../../../Hooks/useVerifiedProperties";
import { Link } from "react-router-dom";
import { AiOutlineDollar } from "react-icons/ai";
import robi from "../../../assets/ads/robi.gif";
import bata from "../../../assets/ads/bata.gif";
import useAuth from "../../../Hooks/useAuth";
import { motion } from 'framer-motion';



const LatestProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();
    const { dayTheme } = useAuth();
    // console.log(verifiedProperties)
    const isFullWidthCard = (index) => {
        // First card and every 7th card after that (0, 7, 14, etc.)
        return index % 7 === 0;
    };

    return (
        <div className='mb-8 md:mb-16 lg:mb-20'>

            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-2">Featured Properties - Explore Our Latest Listings</h2>
            <p className="w-10/12 text-center text-xl md:text-2xl font-medium mx-auto text-gray-500"> Discover the finest homes and investment opportunities with our most recent property additions.</p>
            <div className="divider text-3xl"><FaHome /></div>

            <div className='grid md:grid-cols-12 my-10 gap-4'>
                <div className="md:col-span-10">
                    {/* Property Cards */}
                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {
                            verifiedProperties.slice(0, 6).map((property, index) =>
                                <motion.div
                                    key={property._id}
                                    className={`relative ${isFullWidthCard(index) ? "md:col-span-2" : "md:col-span-1"}`}
                                    whileHover={"hover"}
                                    initial="initial"
                                >
                                    <Link
                                        to={`propertyDetails/${property._id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="block"
                                    >
                                        <div className={`border-b border-gray-400 w-full relative ${!dayTheme && 'bg-gray-600 shadow'}  overflow-hidden`}>
                                            {/* Image Section */}
                                            <div className='w-full relative'>
                                                <motion.img
                                                    src={property.image}
                                                    alt="Property"
                                                    className={`w-full rounded object-cover ${isFullWidthCard ? "h-[500px]" : "h-[400px]"}`}
                                                    variants={{
                                                        initial: { scale: 1 },
                                                        hover: { scale: 1.05 }
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                {/* Dark Overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-black"
                                                    variants={{
                                                        initial: { opacity: 0 },
                                                        hover: { opacity: 0.4, scale: 1.05 }
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                ></motion.div>
                                                {/* Ribbon Animation */}
                                                <motion.div
                                                    className="absolute top-6 -right-2 bg-primary text-white px-4 py-2 font-bold shadow-lg"
                                                    variants={{
                                                        initial: { x: '100%', opacity: 0 },
                                                        hover: { x: 0, opacity: 1 }
                                                    }}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 300,
                                                        damping: 20
                                                    }}
                                                >
                                                    <span>View Listing</span>
                                                    {/* Ribbon tail */}
                                                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-primary"></div>
                                                </motion.div>
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
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        }
                    </div>
                    <div className="flex justify-center">
                        <Link to={'/allProperties'}>
                            <button className="w-fit mt-10 py-1 px-2 border border-amber-500 rounded  bg-amber-50 shadow hover:scale-95 transition-transform transform">View All</button>
                        </Link>
                    </div>
                </div>

                {/* Ad Section */}
                <div className='md:col-span-2'>
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