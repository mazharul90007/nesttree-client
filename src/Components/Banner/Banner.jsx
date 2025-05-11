import banner from '../../assets/Banner/banner6.jpg';

const Banner = () => {
    return (
        <div
            className="h-[550px] w-full bg-cover bg-center relative mb-8 md:mb-16 lg:mb-20"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-0"></div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col top-24 h-full">
                <h1 className="text-primary text-4xl md:text-6xl font-bold text-center">
                    Welcome to NestTree
                </h1>
                <p className='text-amber-600 text-3xl md:text-4xl font-semibold text-center'>Your Trusted Real Estate Partner</p>
            </div>
        </div>
    );
};

export default Banner;
