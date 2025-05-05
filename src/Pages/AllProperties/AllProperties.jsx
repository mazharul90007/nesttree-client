import banner from '../../assets/Banner/banner.jpg';
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import useVerifiedProperties from '../../Hooks/useVerifiedProperties';
import { MdVerifiedUser } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiOutlineDollar } from 'react-icons/ai';
import { useState } from 'react';
import robi from "../../assets/ads/robi.gif";
import bata from "../../assets/ads/bata.gif";
import useAuth from '../../Hooks/useAuth';

const AllProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();
    const [searchProperty, setSearchProperty] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // Track sorting order
    const { dayTheme } = useAuth();

    // Handle sorting
    const handleSort = (order) => {
        setSortOrder(order);
    };

    // Filtering and Sorting Properties
    const filteredProperties = [...verifiedProperties]
        .filter(property =>
            searchProperty
                ? property.location?.toLowerCase().includes(searchProperty.toLowerCase())
                : true
        )
        .sort((a, b) => {
            if (sortOrder === "asc") return a.minPrice - b.minPrice; // Ascending (Lowest Price)
            if (sortOrder === "desc") return b.minPrice - a.minPrice; // Descending (Highest Price)
            return 0; // Default (No sorting)
        });

    return (
        <div className="">
            {/* Banner Section */}
            <div>
                <div
                    className="h-[500px] w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    {/* Overlay Layer */}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    {/* Text Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className='absolute top-20'>
                            <h1 className="text-white text-3xl md:text-5xl mt-5 font-bold text-center">
                                Your Journey to the Perfect Nest <br /> Begins Here.
                            </h1>
                            <label className="input input-bordered flex items-center mx-auto gap-2 max-w-sm mt-10 rounded-xl border border-white shadow-xl">
                                <input
                                    type="text"
                                    className="grow"
                                    value={searchProperty}
                                    onChange={(e) => setSearchProperty(e.target.value)}
                                    placeholder="Search by Location"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sort & Properties Section */}
            <div className='w-11/12 mx-auto'>
                <div className='mt-4 mb-2 relative'>
                    {/* Sort Button with DaisyUI Dropdown */}
                    <div className="dropdown dropdown-right">
                        <button tabIndex={0} className="py-2 px-3 border border-amber-500 rounded flex mx-auto shadow text-gray-500 bg-amber-50 hover:scale-95 transition-transform transform duration-300">
                            Sort by Price
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-amber-50 ml-1 rounded w-36 text-gray-500 font-medium"
                        >
                            <li>
                                <button className='' onClick={() => handleSort("asc")}>
                                    Lowest First
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleSort("desc")}>
                                    Highest First
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='grid md:grid-cols-12 my-16'>
                    {/* Property Cards */}
                    <div className='md:col-span-9 flex flex-col gap-4'>
                        {filteredProperties.length === 0 ? (
                            <div className={`text-center py-10 ${!dayTheme ? 'text-white' : 'text-gray-700'}`}>
                                <h2 className="text-2xl font-semibold">There are no properties matching your search</h2>
                                <p className="mt-2">Search new area</p>
                                {searchProperty && (
                                    <button 
                                        onClick={() => setSearchProperty("")}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredProperties.map(property => (
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
                            ))
                        )}
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
        </div>
    );
};

export default AllProperties;