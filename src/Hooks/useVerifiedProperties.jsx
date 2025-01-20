import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useVerifiedProperties = () => {
    const axiosPublic = useAxiosPublic();
    
    const { data: verifiedProperties = [], isPending: loading, refetch } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/verifiedProperties', {
                params: { status: "verified" } // Send 'status' as a query parameter
            });
            return res.data;
        },
    });
    
    return [verifiedProperties, loading, refetch]
};

export default useVerifiedProperties;