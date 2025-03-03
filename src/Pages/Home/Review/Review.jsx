import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";


const Review = () => {
    const axiosPublic = useAxiosPublic()
    const {dayTheme} = useAuth();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            // console.log(res.data)
            return res.data;
        }
    });

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime))

    return (
        <div className="mb-8 w-11/12 mx-auto">
            <h2 className="text-4xl font-semibold text-center text-primary mb-2">Real Stories, Real Experiences</h2>
            <p className="text-center text-sm text-gray-500 italic font-md mb-16">***User Reviews***</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    sortedReviews.slice(0,4).map(review => 
                        <div key={review._id} className={`shadow flex flex-col justify-between p-2 rounded text-gray-500 ${!dayTheme && 'bg-gray-600 text-gray-200'}`}>
                            <img src={review.reviewerImage
                            } alt="Image" className="w-36 h-36 rounded-full mx-auto" />
                            <h4 className="text-center text-2xl font-semibold mb-4">{review.reviewerName}</h4>
                            <div className="p-1 flex flex-col justify-between flex-grow ">
                                <h3 className={`text-lg font-semibold  text-center ${dayTheme ? 'text-gray-600' : 'text-gray-100'}`}>{review.reviewProperty}</h3>
                                <p className="mb-6  text-center">{review.review}</p>
                                <p className=" text-xs text-gray-400 font-semibold mt-auto">{new Date(review.postedTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Review;