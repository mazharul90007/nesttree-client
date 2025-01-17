import { Helmet } from "react-helmet-async";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NestTree || Home</title>
            </Helmet>
            <h2 className="text-3xl">This is Home</h2>
            <button className="btn btn-primary">Home</button>
        </div>
    );
};

export default Home;