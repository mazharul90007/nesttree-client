import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const ManageReviews = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            // console.log(res.data)
            return res.data;
        }
    })

    const handleReviewDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Review has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className=" border border-amber-600 p-4 w-fit flex gap-3 rounded mx-auto my-10">
                <h2 className="text-4xl border-r-2 border-amber-600 pr-3">Reviews</h2>
                <p className="text-4xl font-bold text-amber-700">{allReviews.length}</p>
            </div>
            <div className="flex flex-col gap-2">
                {
                    allReviews.map(review =>
                        <div key={review._id}
                            className="border p-2 bg-amber-50 rounded"
                        >
                            <div className="flex gap-3 items-center">
                                <div>
                                    <img src={review.reviewerImage} alt="Reviewer" className="w-24 h-24 rounded-md" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-2xl">{review.reviewProperty}</h3>
                                    <p className="text-gray-500"><span className="text-sm">Reviewer:</span> {review.reviewerName}</p>
                                    <p className="text-gray-500"><span className="text-sm">Email:</span> {review.reviewerEmail}</p>

                                    <p className="text-gray-600 font-semibold"><span className="text-sm font-normal text-gray-500">Review:</span> <span>{review.review}</span></p>

                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-xs font-medium italic"> {new Date(review.postedTime).toLocaleString()}</p>
                                        <button onClick={() => handleReviewDelete(review._id)} className="text-red-600 border border-red-500 text-xl w-fit p-1 rounded-full hover:scale-95 transition-transform transform"><MdDelete /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageReviews;