import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useVerifiedProperties from "../../../Hooks/useVerifiedProperties";

const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure();

    const verifiedProperties = useVerifiedProperties();
    console.log(verifiedProperties)

    const handleAdAdvertise = async (property)=>{
        // Destructure to remove _id and keep the rest of the properties
                const { _id, ...advertisedProperty } = property;
                advertisedProperty.advertisementId = _id;  // Use _id as propertyId in advertiseProperty
        
                console.log(advertisedProperty);
        
                try {
                    const advertisRes = await axiosSecure.post('/advertisedProperties', advertisedProperty);
                    if (advertisRes.data.insertedId) {
                        
                        // Show success popup
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: 'The Property has been advertised',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error("Error adding to wishlist:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: "Failed to make Advertisement. Please try again later."
                    });
                }

    }


    // Function to handle empty fields
    const handleEmptyField = (field) => {
        return field ? field : "—";
    };

    return (
        <div>
            <div className=" border border-amber-600 p-4 w-fit rounded mx-auto my-10">
                <h2 className="text-4xl">Advertise a Property</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Agent Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifiedProperties.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No properties available.
                                </td>
                            </tr>
                        ) : (
                            verifiedProperties[0].map((property, index) => (
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <img src={property.image
                                        } alt="property" className="w-16 h-16 rounded" />
                                    </th>
                                    <td>{handleEmptyField(property.title)}</td>
                                    <td>{handleEmptyField(property.location)}</td>
                                    <td>
                                        {property.minPrice && property.maxPrice
                                            ? `${property.minPrice} - ${property.maxPrice}`
                                            : "—"}
                                    </td>
                                    <td>{handleEmptyField(property.agentName)}</td>
                                    <td>
                                        {
                                            
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() => handleAdAdvertise(property)}
                                                            className='border p-1 rounded-md text-sm font-medium shadow bg-green-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                        >
                                                            Advertise
                                                        </button>
                                                        {/* <button
                                                            onClick={() => handleRemoveAdvertise(property)}
                                                            className='border p-1 rounded-md text-sm font-medium shadow bg-orange-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                        >
                                                            Remove
                                                        </button> */}
                                                    </div>

                                        }

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdvertiseProperty;