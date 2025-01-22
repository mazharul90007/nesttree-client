import { useLocation } from "react-router-dom";


const MakeOffer = () => {
    const location = useLocation();
    const property = location.state;
    
    console.log(property)
    return (
        <div>
            The Title Name is: {property.title}
        </div>
    );
};

export default MakeOffer;