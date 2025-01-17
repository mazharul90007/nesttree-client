import banner from '../../assets/Banner/banner6.jpg';

const Banner = () => {
    return (
        <div
            className="h-[500px] w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-0"></div>

            {/* Text Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-primary text-4xl md:text-6xl font-bold text-center">
                    Welcome to NestTree
                </h1>
            </div>
        </div>
    );
};

export default Banner;
