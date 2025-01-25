import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageRequestProperty = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: requestedProperties = [], refetch } = useQuery({
        queryKey: ['requestedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offer/${user.email}`)
            // console.log(res.data)
            return res.data;
        }
    });



    const handleAccept = (property) => {
        console.log(property._id)
        axiosSecure.patch(`/requestedOffer/${property._id}`, { status: "Accepted" })
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Congratulation! You have Accepted the Offer',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleReject = (property) => {
        console.log(property._id)
        axiosSecure.patch(`/requestedOffer/${property._id}`, { status: "rejected" })
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Sorry! You have rejected the Offer',
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
                <h2 className="text-3xl font-semibold my-10 text-center border border-amber-600 w-fit mx-auto p-3 rounded">Manage Requested Properties</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Buyer</th>
                            <th>Buyer Email</th>
                            <th> Offered Price</th>
                            <th> Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedProperties.length == 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No properties available.
                                </td>
                            </tr>
                        ) : (
                            requestedProperties.map((property, index) => (
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td>{handleEmptyField(property.title)}</td>
                                    <td>{handleEmptyField(property.location)}</td>
                                    <td>{handleEmptyField(property.buyerName)}</td>
                                    <td>{handleEmptyField(property.buyerEmail)}</td>
                                    <td>{handleEmptyField(property.offerPrice)}</td>
                                    <td>
                                        {
                                            property?.status === "Accepted" ?
                                                (<div>
                                                    <p className="border p-1 rounded-md text-sm font-medium shadow text-green-600">Accepted</p>
                                                </div>)
                                                : property.status === "rejected" ?
                                                    (<div>
                                                        <p className="border p-1 rounded-md text-sm font-medium shadow text-red-600">Rejected</p>
                                                    </div>)
                                                    : property.status === "pending" &&
                                                    (<div>
                                                        <p className="border p-1 rounded-md text-sm font-medium shadow  text-gray-600">Pending</p>
                                                    </div>)
                                        }
                                    </td>

                                    <td>
                                        {
                                            property?.status === "pending" ?
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => handleAccept(property)}
                                                        className='border p-1 rounded-md text-sm font-medium shadow bg-green-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(property)}
                                                        className='border p-1 rounded-md text-sm font-medium shadow bg-orange-200 text-red-600 hover:scale-95 transform transition-transform duration-300 cursor-pointer'
                                                    >
                                                        Reject
                                                    </button>
                                                </div>

                                                : " - "
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

export default ManageRequestProperty;