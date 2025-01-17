import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProperties = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data: properties = [], isPending: loading, refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/properties')
            return res.data;
        }
    });
    return [properties, loading, refetch]
};

export default useProperties;