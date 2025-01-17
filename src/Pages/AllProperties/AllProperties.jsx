import banner from '../../assets/Banner/banner.jpg'
import { FaSearch } from "react-icons/fa";
import useProperties from '../../Hooks/useProperties';

const AllProperties = () => {
    const [properties] = useProperties();
    return (
        <div className="pt-20">
            <div>
                <div
                    className="h-[400px] w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    {/* Overlay Layer */}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    {/* Text Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className='absolute '>
                            <h1 className="text-white  text-3xl md:text-5xl mt-5 font-bold text-center">
                                Your Journey to the Perfect Nest <br /> Begins Here.
                            </h1>
                            <label className="input input-bordered flex items-center mx-auto gap-2 max-w-sm mt-10 rounded-3xl border border-white shadow-xl">
                                <input type="text" className="grow" placeholder="Search by District" />
                                <div className="text-primary border-2 border-primary p-2 rounded-full cursor-pointer"><FaSearch /></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProperties;