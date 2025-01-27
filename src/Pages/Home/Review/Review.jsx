import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Review = () => {
    const axiosPublic = useAxiosPublic()

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            console.log(res.data)
            return res.data;
        }
    });

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime))

    return (
        <div className="mb-16 w-11/12 mx-auto">
            <h2 className="text-4xl font-semibold text-center mb-2">Real Stories, Real Experiences</h2>
            <p className="text-center text-sm text-gray-500 italic font-md mb-6">***User Reviews***</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4">
                {
                    sortedReviews.map(review => 
                        <div key={review._id} className="shadow">
                            <img src={review.reviewerImage
                            } alt="Image" className="w-36 h-36 rounded-full mx-auto" />
                            <h4 className="text-center text-2xl font-semibold text-gray-500">{review.reviewerName}</h4>
                            <div className="p-1">
                                <h3 className="text-xl font-semibold text-gray-600 text-center">{review.reviewProperty}</h3>
                                <p className="mb-6 text-gray-500 text-center">{review.review}</p>
                                <p className=" text-xs text-gray-400 font-semibold">{new Date(review.postedTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Review;