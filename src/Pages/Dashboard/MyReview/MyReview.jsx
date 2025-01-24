import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const MyReview = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myReviews/${user.email}`)
            return res.data;

        }
    });

    const handleReviewDelete = (id)=>{
        console.log(id)
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
            <div></div>
            <div className=" flex flex-col gap-2">
                {
                    reviews.map(review => 
                        <div key={review._id}
                        className="border p-2 bg-amber-50 rounded"
                        >
                            <h3 className="text-2xl">{review.reviewProperty}</h3>
                            <p className="text-gray-500">Agent: {review.agentName}</p>
                            <p className="text-gray-500">Review:</p>
                            <div className="mx-4 mb-2 border border-gray-200 p-2 rounded-lg shadow-inherit">
                                <p className="text-gray-600">{review.review}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm font-medium italic"> {new Date(review.postedTime).toLocaleString()}</p>
                                <button onClick={()=>handleReviewDelete(review._id)} className="text-red-600 border border-red-500 text-xl w-fit p-1 rounded-full hover:scale-95 transition-transform transform"><MdDelete /></button>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default MyReview;