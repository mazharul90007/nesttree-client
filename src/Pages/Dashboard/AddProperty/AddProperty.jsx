import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaHome } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddProperty = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            //now send the menu item data to the server with the image
            const propertyInfo = {
                title: data.title,
                location: data.location,
                bed: parseInt(data.bed),
                bath: parseInt(data.bath),
                livingRoom: data.livingRoom,
                diningRoom: data.diningRoom,
                parking: parseInt(data.parking),
                builtYear: parseInt(data.builtYear),
                space: parseFloat(data.space),
                type: data.type,
                district: data.district,
                minPrice: parseFloat(data.minPrice),
                maxPrice: parseFloat(data.maxPrice),
                image: res.data.data.display_url,
                propertyDetails: data.propertyDetails,
                agentName: user?.displayName,
                agentEmail: user?.email,
                agentImage: user?.photoURL,
                status: 'pending'
            }
            //
            const propertyRes = await axiosSecure.post('/properties', propertyInfo);
            console.log(propertyRes.data)
            if (propertyRes.data.insertedId) {
                reset();
                //show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Your Property has been added',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data)
    }
    return (
        <div>
            <h2>This is Add Property Page</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Property Title */}
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Property Title*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="2 bed room unit at Mohammadpur"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full" />
                    </label>
                    {/* Property Location */}
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Property Location*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type Full Address"
                            {...register('location', { required: true })}
                            className="input input-bordered w-full" />
                    </label>

                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {/*Bed Room */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Bed Room</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Bed"
                                {...register('bed', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                        {/*Bath Room */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Bath Room</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Bath"
                                {...register('bath', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                        {/* Living Room */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Living Room</span>
                            </div>
                            <select defaultValue='default' {...register('livingRoom' , {required: true})}
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select Yes/No</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>

                        {/* Dining Room */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Dining Room</span>
                            </div>
                            <select defaultValue='default' {...register('diningRoom' , {required: true})}
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select Yes/No</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>

                        {/*Parking */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parking</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Parking"
                                {...register('parking', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                        {/*Built Year */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Year built</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Built Year"
                                {...register('builtYear', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                        {/*Space */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Space in sqft</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Total sqft"
                                {...register('space', { required: true })}
                                className="input input-bordered w-full" />
                        </label>
                        {/* House Type */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">House Type</span>
                            </div>
                            <select defaultValue='default' {...register('type' , {required: true})}
                                className="select select-bordered w-full">
                                <option disabled value='default'>House Type</option>
                                <option value="FullHouse">Full House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Unit">Unit</option>
                                <option value="Studio">Studio</option>
                            </select>
                        </label>

                    </div>

                    <div className="flex gap-4">
                        {/* District */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">District*</span>
                            </div>
                            <select defaultValue='default' {...register('district', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select Property District</option>
                                <option value="bagerhat">Bagerhat</option>
                                <option value="bandarban">Bandarban</option>
                                <option value="barguna">Barguna</option>
                                <option value="barishal">Barishal</option>
                                <option value="bhola">Bhola</option>
                                <option value="bogra">Bogra</option>
                                <option value="brahmanbaria">Brahmanbaria</option>
                                <option value="chandpur">Chandpur</option>
                                <option value="chattogram">Chattogram</option>
                                <option value="chuadanga">Chuadanga</option>
                                <option value="coxs bazar">Coxs Bazar</option>
                                <option value="cumilla">Cumilla</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="dinajpur">Dinajpur</option>
                                <option value="faridpur">Faridpur</option>
                                <option value="feni">Feni</option>
                                <option value="gaibandha">Gaibandha</option>
                                <option value="gazipur">Gazipur</option>
                                <option value="gopalganj">Gopalganj</option>
                                <option value="habiganj">Habiganj</option>
                                <option value="jamalpur">Jamalpur</option>
                                <option value="jashore">Jashore</option>
                                <option value="jhalokati">Jhalokati</option>
                                <option value="jhenaidah">Jhenaidah</option>
                                <option value="joypurhat">Joypurhat</option>
                                <option value="khagrachari">Khagrachari</option>
                                <option value="khulna">Khulna</option>
                                <option value="kishoreganj">Kishoreganj</option>
                                <option value="kurigram">Kurigram</option>
                                <option value="kushtia">Kushtia</option>
                                <option value="lakshmipur">Lakshmipur</option>
                                <option value="lalmonirhat">Lalmonirhat</option>
                                <option value="madaripur">Madaripur</option>
                                <option value="magura">Magura</option>
                                <option value="manikganj">Manikganj</option>
                                <option value="meherpur">Meherpur</option>
                                <option value="moulvibazar">Moulvibazar</option>
                                <option value="munshiganj">Munshiganj</option>
                                <option value="mymensingh">Mymensingh</option>
                                <option value="naogaon">Naogaon</option>
                                <option value="narail">Narail</option>
                                <option value="narayanganj">Narayanganj</option>
                                <option value="narsingdi">Narsingdi</option>
                                <option value="natore">Natore</option>
                                <option value="netrokona">Netrokona</option>
                                <option value="nilphamari">Nilphamari</option>
                                <option value="noakhali">Noakhali</option>
                                <option value="pabna">Pabna</option>
                                <option value="panchagarh">Panchagarh</option>
                                <option value="patuakhali">Patuakhali</option>
                                <option value="pirojpur">Pirojpur</option>
                                <option value="rajbari">Rajbari</option>
                                <option value="rajshahi">Rajshahi</option>
                                <option value="rangamati">Rangamati</option>
                                <option value="rangpur">Rangpur</option>
                                <option value="satkhira">Satkhira</option>
                                <option value="shariatpur">Shariatpur</option>
                                <option value="sherpur">Sherpur</option>
                                <option value="sirajganj">Sirajganj</option>
                                <option value="sunamganj">Sunamganj</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="tangail">Tangail</option>
                                <option value="thakurgaon">Thakurgaon</option>


                            </select>
                        </label>

                        {/*minimum price */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Min Price</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Min Price"
                                {...register('minPrice', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                        {/*maximum price */}
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Max Price</span>
                            </div>
                            <input
                                type="Number"
                                placeholder="Max Price"
                                {...register('maxPrice', { required: true })}
                                className="input input-bordered w-full" />
                        </label>

                    </div>
                    {/* Property Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Property Details</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Details"
                            {...register('propertyDetails')}
                        >
                        </textarea>
                    </label>

                    {/* property Image */}
                    <div className="my-4 w-fit">
                        <input
                            type="file"
                            className="file-input w-full"
                            {...register('image', { required: true })}
                        />
                    </div>
                    <button className="btn">Add Property <FaHome></FaHome></button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;