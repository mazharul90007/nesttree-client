import search from "../../../assets/icons/search.png"
import payment from "../../../assets/icons/payment.png"
import clock from "../../../assets/icons/clock.png"
import useAuth from "../../../Hooks/useAuth";

const Facilities = () => {
    const {dayTheme} = useAuth();
    return (
        <div className={`my-16 py-16 w-11/12 mx-auto rounded-lg ${dayTheme ? 'bg-[#F0E2D5]' : 'bg-gray-600 text-gray-200'}`}>
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-2">How Nesttree Simplifies Property Buying</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {/* column1 */}
                <div className="md:col-span-1 md:px-6 text-center space-y-3">
                    <img src={search} alt="Search" className="w-32 h-32 mx-auto" />
                    <h3 className="text-2xl font-semibold">Comprehensive Property Details</h3>
                    <p className="">At Nesttree, we provide in-depth property listings that include every detail you need to make an informed decision. From the number of rooms and bathrooms to parking availability and the property build year, we ensure that you have all the necessary information at your fingertips.</p>

                </div>

                {/* column1 */}
                <div className="md:col-span-1 md:px-6 text-center space-y-3">
                    <img src={payment} alt="Search" className="w-32 h-32 mx-auto" />
                    <h3 className="text-2xl font-semibold">Hassle-Free Online Payment System</h3>
                    <p className="">Nesttree makes property transactions easier with our secure and user-friendly online payment system. Whether you are paying for rent, booking a property, or securing a purchase, our seamless payment gateway ensures a safe, efficient, and transparent process.</p>

                </div>

                {/* column1 */}
                <div className="md:col-span-1 md:px-6 text-center space-y-3">
                    <img src={clock} alt="Search" className="w-32 h-32 mx-auto" />
                    <h3 className="text-2xl font-semibold">24/7 Customer Service Support</h3>
                    <p className="">We understand that questions or concerns can arise at any time, which is why Nesttree offers round-the-clock customer service. Our dedicated team is available 24/7 to assist with any queries, whether its about a property, payment issues, or any other concerns.</p>

                </div>
            </div>
        </div>
    );
};

export default Facilities;