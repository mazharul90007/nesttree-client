import useProperties from "../../../Hooks/useProperties";


const ManageProperties = () => {
    const [properties] = useProperties();
    return (
        <div>
            <div></div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
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
                        {
                            properties.map((property, index) =>
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        

                                    </td>
                                    <td>
                                        
                                    </td>

                                    <td>
                                        
                                    </td>
                                    <td>
                                        
                                    </td>

                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;