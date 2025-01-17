import { FaBath, FaBed, FaCar } from "react-icons/fa";
import useProperties from "../../../Hooks/useProperties";


const LatestProperties = () => {
    const [properties] = useProperties();


    return (
        <div className="my-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    properties.map((property, index) =>
                        <div key={index} className="card card-compact shadow-xl">
                            <figure>
                                <img
                                    src={property.image}
                                    alt="Property"
                                    className="w-full"
                                    />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">$  {property.price}<span className="text-sm">/month</span></h2>

                                <p>{property.address}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <span><FaBed /></span>
                                        <p> {property.bedrooms}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span><FaBath /></span>
                                        <p> {property.bathrooms}</p>
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