import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";


const Review = () => {

    const { dayTheme } = useAuth();

    const testimonials = [
        {
            id: 1,
            name: "Dr. Jahangir Kabir",
            role: "Homebuyer",
            rating: 5,
            content: "NestTree helped me find my dream apartment in Dhaka effortlessly! The detailed listings and virtual tours saved me weeks of site visits. The payment process was secure and seamless.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            accentColor: "bg-blue-500"
        },
        {
            id: 2,
            name: "Sarah Miller",
            role: "Investor",
            rating: 4,
            content: "As an NRI, I was skeptical about buying property remotely, but NestTree’s verified listings and 24/7 support made it stress-free. I now own a rental property in Sylhet!",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            accentColor: "bg-green-500"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "First-Time Buyer",
            rating: 5,
            content: "The AI recommendations matched me perfectly with a family-friendly condo in Chattogram. The legal assistance team even handled my paperwork! 10/10 would recommend NestTree.",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            accentColor: "bg-orange-500"
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section className="mb-8 md:mb-16 lg:mb-20">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-12">
                    <p className={`uppercase text-xl font-semibold text-center mb-2 ${!dayTheme ? 'text-gray-400' : 'text-gray-700'}`}>Testimonials</p>

                    <h3 className={`uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 ${!dayTheme ? "text-gray-400" : "text-primary"}`}>What Our Customers Say</h3>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="flex"
                        >
                            <div className={`px-6 py-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full w-full relative overflow-hidden group border ${!dayTheme ? 'bg-dark-surface border-gray-400 shadow-gray-400' : 'bg-white border-gray-200'}`}>
                                {/* Decorative accent circle */}
                                <div
                                    className={`absolute -top-16 -left-16 h-40 w-40 ${testimonial.accentColor} rounded-full opacity-10 transition-all duration-500 ease-in-out z-0 group-hover:scale-[12] group-hover:opacity-10 group-hover:-top-full group-hover:-left-full`}
                                    style={{
                                        transformOrigin: 'top left',
                                    }}
                                ></div>

                                {/* Content */}
                                <div className="z-10 relative">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
                                            />
                                        ))}
                                    </div>
                                    <FaQuoteLeft className="text-gray-300 text-3xl mb-4" />
                                    <p className={`mb-6 flex-grow text-lg leading-relaxed ${!dayTheme ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.content}</p>
                                    <div className="flex items-center mt-auto">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow"
                                        />
                                        <div>
                                            <h4 className={`font-bold ${!dayTheme ? 'text-gray-400' : 'text-gray-800'}`}>{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Review;