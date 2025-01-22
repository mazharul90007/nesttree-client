import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { BiSolidOffer } from "react-icons/bi";


const MakeOffer = () => {
    const location = useLocation();
    const property = location.state;
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    console.log(property)

    const onSubmit = async (data) => {
        //now send the menu item data to the server with the image
        const propertyInfo = {
            title: data.title,
            location: data.location,
            agentName: data.agentName,
            agentEmail: property?.agentEmail,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyingDate: data.buyingDate,
            offerPrice: data.offerPrice,
            status: 'pending'
        }
        console.log(propertyInfo)

        //Update data to server
        const propertyRes = await axiosSecure.post('/offer', propertyInfo);
        console.log(propertyRes.data)
        if (propertyRes.data.insertedId) {
            reset();
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Your Offer request has been sent to the Agent',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div>
            <div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Property Title */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Property Title*</span>
                            </div>
                            <input
                                type="text"
                                defaultValue={property.title}
                                readOnly
                                placeholder="2 bed room unit at Mohammadpur"
                                {...register('title', { required: true })}
                                className="input input-bordered w-full pointer-events-none focus:outline-none focus:ring-0 bg-gray-100" />
                        </label>
                        {/* Property Location */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Property Location*</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type Full Address"
                                readOnly
                                defaultValue={property.location}
                                {...register('location', { required: true })}
                                className="input input-bordered w-full pointer-events-none focus:outline-none focus:ring-0 bg-gray-100" />
                        </label>
                        {/* Agent name */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Agent</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type Full Address"
                                readOnly
                                defaultValue={property.agentName}
                                {...register('agentName', { required: true })}
                                className="input input-bordered w-full pointer-events-none focus:outline-none focus:ring-0 bg-gray-100" />
                        </label>
                        {/* Buyer Name */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Buyer Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type Full Address"
                                readOnly
                                defaultValue={user?.displayName}
                                {...register('buyerName', { required: true })}
                                className="input input-bordered w-full pointer-events-none focus:outline-none focus:ring-0 bg-gray-100" />
                        </label>
                        {/* Buyer Email */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Buyer Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type Full Address"
                                readOnly
                                defaultValue={user?.email}
                                {...register('buyerEmail', { required: true })}
                                className="input input-bordered w-full pointer-events-none focus:outline-none focus:ring-0 bg-gray-100" />
                        </label>
                        <div className="flex flex-col">
                            {/* Buying Date */}
                            <label className="form-control w-fit my-4">
                                <div className="label">
                                    <span className="label-text">Buying Date</span>
                                </div>
                                <input
                                    type="date"
                                    placeholder="Type Full Address"
                                    {...register('buyingDate', { required: true })}
                                    className="input input-bordered w-full" />
                            </label>
                            <div className="flex gap-4"></div>

                            {/*Offer price */}
                            <label className="form-control w-fit my-4">
                                <div className="label">
                                    <span className="label-text">Your Offer Price
                                        <span className="text-red-500 text-sm italic"> (Price must be between {property.minPrice} to {property.maxPrice})</span></span>
                                </div>
                                <input
                                    type="Number"
                                    placeholder="Offer Price"
                                    defaultValue={property.minPrice}
                                    {...register('offerPrice', { required: true })}
                                    className="input input-bordered w-full" />
                            </label>

                        </div>
                        <button className="btn">Make Offer <BiSolidOffer /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeOffer;