import Swal from "sweetalert2";
import useProperties from "../../../Hooks/useProperties";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageProperties = () => {
    const [properties, refetch] = useProperties();
    const axiosSecure = useAxiosSecure();

    const handleVerify = (property) => {
        axiosSecure.patch(`/verifyProperty/${property._id}`, { status: "verified" })
            .then(res => {
                const data = res.data;
                refetch();
                // console.log(data)
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Congratulation! The Property has been verified',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleReject = (property) => {
        axiosSecure.patch(`/verifyProperty/${property._id}`, { status: "rejected" })
            .then(res => {
                const data = res.data;
                refetch();
                // console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Sorry! The Property is rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    // Function to handle empty fields
    const handleEmptyField = (field) => {
        return field ? field : "—";
    };

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Manage Properties</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No properties available.
                                </td>
                            </tr>
                        ) : (
                            properties.map((property, index) => (
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td>{handleEmptyField(property.title)}</td>
                                    <td>{handleEmptyField(property.location)}</td>
                                    <td>
                                        {property.minPrice && property.maxPrice
                                            ? `${property.minPrice} - ${property.maxPrice}`
                                            : "—"}
                                    </td>
                                    <td>{handleEmptyField(property.agentName)}</td>
                                    <td>{handleEmptyField(property.agentEmail)}</td>
                                    <td>
                                        {
                                            property?.status === "verified" ?
                                                (<div>
                                                    <p className="border p-1 rounded-md text-sm font-medium shadow bg-green-200 text-red-600">Verified</p>
                                                </div>)
                                                : property.status === "rejected" ?
                                                    (<div>
                                                        <p className="border p-1 rounded-md text-sm font-medium shadow bg-orange-200 text-red-600">Rejected</p>
                                                    </div>)

                                                    :
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() => handleVerify(property)}
                                                            className='border p-1 rounded-md text-sm font-medium shadow bg-green-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                        >
                                                            Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(property)}
                                                            className='border p-1 rounded-md text-sm font-medium shadow bg-orange-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                        >
                                                            Reject
                                                        </button>
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

export default ManageProperties;
