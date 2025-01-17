import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import LatestProperties from "./LatestProperies/LatestProperties";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NestTree || Home</title>
            </Helmet>
            <Banner></Banner>
            <LatestProperties></LatestProperties>
        </div>
    );
};

export default Home;