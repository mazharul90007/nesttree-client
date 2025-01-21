import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import bed from '../../assets/icons/bed.png'
import bath from '../../assets/icons/bath.png'
import parking from '../../assets/icons/parking.png'
import living from '../../assets/icons/living.png'
import calender from '../../assets/icons/calender.png'
import write from '../../assets/icons/write.png'
import space from '../../assets/icons/space.png'
import { FaRegHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Details = ({ property }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const openModal = () => {
        document.getElementById('addReview').showModal()
    };

    const closeModal = () => {
        document.getElementById('addReview').close();
    };

    const handleReview = async (e) => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;
        const reviewPropertyId = property._id;
        const reviewerName = user.displayName;
        const reviewerImage = user.photoURL;
        const reviewProperty = property.title;
        const reviewerEmail = user.email;

        const reviewInfo = { review, reviewPropertyId, reviewerName, reviewerImage, reviewProperty, reviewerEmail }

        console.log(reviewInfo);
        

        //Add review to the server
        const propertyRes = await axiosSecure.post('/reviews', reviewInfo);
        console.log(propertyRes.data)
        if (propertyRes.data.insertedId) {
            //show success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Your Review has been added',
                showConfirmButton: false,
                timer: 1500
            });
        }

        // Make all the field empty and close the modal
        form.review.value = '';
        closeModal();
    };


    return (
        <div>
            <div className="grid grid-cols-12 w-11/12 mx-auto">
                <div className="col-span-9">
                    <div className="flex justify-center mb-6">
                        <img src={property.image} alt="Property Image" className="h-[450px] w-auto rounded-lg" />
                    </div>
                    {/* Verification Status and WishList */}
                    <div className="flex justify-between items-center">
                        <div className="text-green-600 flex items-center gap-1">
                            <FaCheckCircle /> <span>Verified</span>
                        </div>
                        <div>
                            <button
                                // aria-label="Add to Wishlist"
                                className="bottom-2 right-2 text-sm text-primary p-1 border border-primary rounded-md font-medium shadow hover:scale-95 transform transition-transform flex items-center gap-1 bg-orange-100"
                            >
                                <FaRegHeart /> Add to Wishlist
                            </button>

                        </div>
                    </div>
                    {/* Property Title */}
                    <h3 className="text-3xl font-semibold mt-6">{property.title}</h3>
                    {/* Price */}
                    <div className="text-xl font-semibold italic text-gray-500 flex items-center gap-1">
                        <TbCoinTaka />
                        <p>{property.minPrice} - {property.maxPrice}</p>
                    </div>

                    {/* Location */}
                    <p>{property.location}</p>

                    <div className="py-6 flex flex-wrap gap-2">
                        {/* Bed */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={bed} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Bed Rooms</p>
                                <p className="text-4xl font-bold text-center">{property.bed}</p>
                            </div>
                        </div>
                        {/* Bath */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={bath} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Bath Rooms</p>
                                <p className="text-4xl font-bold text-center">{property.bath}</p>
                            </div>
                        </div>
                        {/* Parking */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={parking} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Parking</p>
                                <p className="text-4xl font-bold text-center">{property.parking}</p>
                            </div>
                        </div>
                        {/* Living Room */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={living} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Living Room</p>
                                <p className="text-4xl font-bold text-center">{property.livingRoom}</p>
                            </div>
                        </div>
                        {/* Dining Room */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={living} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Dining Room</p>
                                <p className="text-4xl font-bold text-center">{property.diningRoom}</p>
                            </div>
                        </div>
                        {/* Built Year */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={calender} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Built Year</p>
                                <p className="text-4xl font-bold text-center">{property.builtYear}</p>
                            </div>
                        </div>
                        {/* Space */}
                        <div className="flex items-center gap-1 border border-gray-400 w-fit p-1">
                            <img src={space} alt="Bed" className="w-12 h-12" />
                            <div>
                                <p>Space sqft</p>
                                <p className="text-4xl font-bold text-center">{property.space}</p>
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <p>Details: <span className="text-gray-500">{property.propertyDetails}</span></p>
                    {/* Agent */}
                    <p className="mt-6 text-gray-400 italic">Posted By: {property.agentName}</p>
                    <div className="my-6">
                        <div className="divider">Review</div>
                        <button onClick={() => openModal(property)} className='bottom-2 right-2 text-sm text-primary p-1 border border-primary rounded-md font-medium shadow hover:scale-95 transform transition-transform flex items-center gap-1 bg-orange-100'>
                            Add a Review
                        </button>
                    </div>
                </div>
                <div className="col-span-3">

                </div>
            </div>
            {/* Show Modal */}
            <dialog id="addReview" className="modal" onClick={(e) => {
                if (e.target.tagName === 'DIALOG') e.target.close();
            }}>
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center">Type Your Review</h3>
                    <img src={write} alt="review" className="w-16 h-16 mx-auto" />
                    <div className="modal-action mt-3 pt-0">
                        <form onSubmit={handleReview} method="dialog" className="w-full">
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Review"
                                name="review"
                                required
                            ></textarea>
                            <button className="btn">Post</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Details;

Details.propTypes = {
    property: PropTypes.object
}