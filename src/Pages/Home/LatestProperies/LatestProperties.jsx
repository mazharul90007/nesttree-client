import { FaBath, FaBed, FaCar } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import useVerifiedProperties from "../../../Hooks/useVerifiedProperties";



const LatestProperties = () => {
    const [verifiedProperties] = useVerifiedProperties();


    return (
        <div className="my-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    verifiedProperties.map((property, index) =>
                        <div key={index} className="card card-compact rounded shadow-md">
                            <figure>
                                <img
                                    src={property.image}
                                    alt="Property"
                                    className="w-full h-64"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="text-2xl font-semibold">{property.title}</h2>

                                <div className="text-lg font-semibold italic text-gray-500 flex items-center gap-1">
                                    <TbCoinTaka />
                                    <p>{property.minPrice} - {property.maxPrice}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm  font-semibold">{property.location}</p>
                                    <p className="text-gray-500 text-sm  font-semibold">Dist: {property.district}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <span><FaBed /></span>
                                        <p> {property.bed}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span><FaBath /></span>
                                        <p> {property.bath}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span><FaCar /></span>
                                        <p> {property.parking}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default LatestProperties;