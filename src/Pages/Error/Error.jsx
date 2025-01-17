import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="text-center my-24">
            <h2 className="text-5xl text-purple-500 font-semibold">This is Error Page</h2>
            <Link to={'/'}><button className="btn btn-warning my-10">Back</button></Link>
        </div>
    );
};

export default Error;