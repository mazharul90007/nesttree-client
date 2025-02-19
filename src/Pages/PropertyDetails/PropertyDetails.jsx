
import { useLoaderData } from "react-router-dom";
import Details from "../../Components/Details/Details";


const PropertyDetails = () => {
   const property = useLoaderData(); 

    return (
        <div className="py-8">
            <Details property={property}></Details>
        </div>
    );
};

export default PropertyDetails;