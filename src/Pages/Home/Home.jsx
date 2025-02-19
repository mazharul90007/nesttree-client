import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import LatestProperties from "./LatestProperies/LatestProperties";
import AdvertisementProperty from "./AdvertisementPropertySection/AdvertisementProperty";
import Facilities from "./Facilities/Facilities";
import Review from "./Review/Review";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NestTree || Home</title>
            </Helmet>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="w-11/12 mx-auto">
                <LatestProperties></LatestProperties>
                <AdvertisementProperty></AdvertisementProperty>
            </div>
            <div>
                <Facilities></Facilities>
            </div>
            <Review></Review>
        </div>
    );
};

export default Home;