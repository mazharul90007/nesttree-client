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
import { useQuery } from "@tanstack/react-query";

const Details = ({ property }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //get specific wishlist by searching user Email and property Id

    const { data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email, property?._id], // Add user.email and property._id as query key to ensure fresh data
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist`, {
                params: {
                    userEmail: user.email,
                    propertyId: property._id,
                },
            });
            // console.log(wishlist)
            return res.data;
        },
    });


    //get Reviews
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${property._id}`);
            return res.data;
        }
    })

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
        const postedTime = Date.now();
        const reviewInfo = { review, reviewPropertyId, reviewerName, reviewerImage, reviewProperty, reviewerEmail, postedTime }

        console.log(reviewInfo);

        //Add review to the server
        const reviewRes = await axiosSecure.post('/reviews', reviewInfo);
        console.log(reviewRes.data)
        if (reviewRes.data.insertedId) {
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

    const handleAddToWishlist = async (property) => {
        // Destructure to remove _id and keep the rest of the properties
        const { _id, ...wishlistProperty } = property;
        wishlistProperty.userEmail = user.email;
        wishlistProperty.propertyId = _id;  // Use _id as propertyId in wishlist

        console.log(wishlistProperty);

        try {
            const wishlistRes = await axiosSecure.post('/wishlist', wishlistProperty);
            
            if (wishlistRes.data.insertedId) {
                // Show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'The Property has been added to Wishlist',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to add the property to the wishlist. Please try again later."
            });
        }
    };




    return (
        <div>
            <div className="grid w-11/12 mx-auto">
                <div className="">
                    <div className="flex justify-center mb-6">
                        <img src={property.image} alt="Property Image" className="h-[450px] w-auto rounded-lg" />
                    </div>
                    {/* Verification Status and WishList */}
                    <div className="flex justify-between items-center">
                        <div className="text-green-600 flex items-center gap-1">
                            <FaCheckCircle /> <span>Verified</span>
                        </div>
                        <div>
                            {
                                wishlist?.userEmail === user?.email && wishlist?.propertyId === property._id
                                    ?
                                    <p className="text-green-600 border p-1 border-green-600 rounded">You have already added this Property in your Wishlist</p>
                                    :
                                    <button
                                        onClick={() => handleAddToWishlist(property)}
                                        // aria-label="Add to Wishlist"
                                        className="bottom-2 right-2 text-sm text-primary p-1 border border-primary rounded-md font-medium shadow hover:scale-95 transform transition-transform flex items-center gap-1 bg-orange-100"
                                    >
                                        <FaRegHeart /> Add to Wishlist
                                    </button>
                            }


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
                        {/* Show All Reviews */}
                        <div className="mt-4">
                            <p className="mb-3 text-xl italic">Total Review: {reviews.length}</p>
                            {
                                reviews.map(review =>
                                    <div
                                        key={review._id}
                                        className="flex items-center gap-4 mb-2 border-b border-gray-300"
                                    >
                                        <div>
                                            <img src={review.reviewerImage} alt="Reviewer" className="w-10 h-10 rounded" />
                                            <p>{review.reviewerName}</p>
                                        </div>
                                        <div>
                                            <p>{review.review}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
            {/* Show Modal */}
            <dialog id="addReview" className="modal" aria-modal="true">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center">Type Your Review</h3>
                    <img src={write} alt="review" className="w-16 h-16 mx-auto" />
                    <form onSubmit={handleReview} method="dialog" className="w-full">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Review"
                            name="review"
                            required
                        ></textarea>
                        <button className="btn btn-sm border border-green-500 mt-1 text-green-700">Post</button>
                    </form>
                    <div className="flex justify-end">
                        <button onClick={() => closeModal()} className="btn btn-sm border border-red-600 text-primary">X</button>
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