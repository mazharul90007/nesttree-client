
import { useLoaderData } from "react-router-dom";
import Details from "../../Components/Details/Details";


const PropertyDetails = () => {
   const property = useLoaderData(); 
   console.log(property)

    return (
        <div className="py-24">
            <Details property={property}></Details>
        </div>
    );
};

export default PropertyDetails;