import banner from '../../assets/Banner/banner.jpg'
import { FaSearch, FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import useVerifiedProperties from '../../Hooks/useVerifiedProperties';
import { TbCoinTaka } from 'react-icons/tb';
import { MdVerifiedUser } from 'react-icons/md';

const AllProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();

    return (
        <div className="pt-20">
            <div>
                <div
                    className="h-[400px] w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    {/* Overlay Layer */}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    {/* Text Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className='absolute '>
                            <h1 className="text-white  text-3xl md:text-5xl mt-5 font-bold text-center">
                                Your Journey to the Perfect Nest <br /> Begins Here.
                            </h1>
                            <label className="input input-bordered flex items-center mx-auto gap-2 max-w-sm mt-10 rounded-3xl border border-white shadow-xl">
                                <input type="text" className="grow" placeholder="Search by District" />
                                <div className="text-primary border-2 border-primary p-2 rounded-full cursor-pointer"><FaSearch /></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid md:grid-cols-12'>

                {/* Property Cards */}
                <div className='md:col-span-9 flex flex-col gap-4'>
                    {
                        verifiedProperties.map(property =>
                            <div key={property._id} className="bg-base-100 rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 items-center w-full relative">
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
                                        className="h-40 w-60 rounded-lg"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className='space-y-1'>
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

export default AllProperties;