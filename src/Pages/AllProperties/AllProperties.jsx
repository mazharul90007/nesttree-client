import banner from '../../assets/Banner/banner.jpg'
import { FaSearch, FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import useProperties from '../../Hooks/useProperties';

const AllProperties = () => {
    const [properties] = useProperties();
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
                <div className='md:col-span-8 flex flex-col gap-4'>
                    {
                        properties.map(property =>
                            <div key={property._id} className="bg-base-100 rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 items-center w-full">
                                {/* Image Section */}
                                <div>
                                    <img
                                        src={property.image}
                                        alt="Property"
                                        className="h-40 w-60 rounded-lg object-cover"
                                    />
                                </div>

                                {/* Content Section */}
                                <div>
                                    <h3 className="text-lg font-bold">$1300 <span className="text-sm font-medium">Unit</span></h3>
                                    <p className="text-sm text-gray-500">17/1 King Street, Newcastle NSW 2300</p>
                                    <div className="flex gap-4 mt-3">
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
                                    <div className="mt-2 flex gap-2">
                                        <span className="bg-orange-300 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                                            New
                                        </span>
                                        <span className="bg-purple-300 text-purple-700 text-xs font-semibold px-2 py-1 rounded">
                                            NBN
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Ad Section */}
                <div className='md:col-span-4'>

                </div>
            </div>
        </div>
    );
};

export default AllProperties;