import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MySoldProperties = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: soldProperties = [] } = useQuery({
        queryKey: ['soldProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/soldProperties/${user.email}`)
            console.log(res.data)
            return res.data;
        }
    });

    // Function to handle empty fields
    const handleEmptyField = (field) => {
        return field ? field : "—";
    };

    return (
        <div>
            <div className=" border border-amber-600 p-4 w-fit flex gap-3 rounded mx-auto my-10">
                <h2 className="text-4xl border-r-2 border-amber-600 pr-3">Sold Properties</h2>
                <p className="text-4xl font-bold text-amber-700">{soldProperties.length}</p>
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
                            <th> Sold Price (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soldProperties.length == 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No properties available.
                                </td>
                            </tr>
                        ) : (
                            soldProperties.map((property, index) => (
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td>{handleEmptyField(property.propertyTitle)}</td>
                                    <td>{handleEmptyField(property.propertyLocation)}</td>
                                    <td>{handleEmptyField(property.buyerName)}</td>
                                    <td>{handleEmptyField(property.buyerEmail)}</td>
                                    <td className="font-bold text-red-600">{handleEmptyField(property.price)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperties;