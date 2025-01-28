import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Support = () => {
    return (
        <div className="bg-gray-50 py-20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">Get In Touch With Us</h1>
        <p className="mt-4 text-gray-600 text-lg">
          We are here to help. Reach out to us for any inquiries, feedback, or support!
        </p>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone Support */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <FaPhoneAlt size={40} className="text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Phone Support</h3>
            <p className="text-gray-600 mt-2">You can reach us at the following number:</p>
            <p className="text-blue-500 font-semibold">(+88) 01949662167</p>
          </div>

          {/* Email Support */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <FaEnvelope size={40} className="text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Email Support</h3>
            <p className="text-gray-600 mt-2">For any inquiries, please email us at:</p>
            <p className="text-blue-500 font-semibold">support@nesttree.com</p>
          </div>

          {/* Visit Us */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <FaMapMarkerAlt size={40} className="text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Visit Us</h3>
            <p className="text-gray-600 mt-2">Our office is located at:</p>
            <p className="text-blue-500 font-semibold">123 NestTree St, Dhanmondi, Dhaka</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="container mx-auto px-6 lg:px-8 mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Our Office Hours</h2>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-600 text-center mb-4">We are available during the following hours:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            <div className="text-center">
              <p className="font-semibold">Monday - Friday</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Saturday</p>
              <p>10:00 AM - 2:00 PM</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Sunday</p>
              <p>Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="container mx-auto px-6 lg:px-8 mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-facebook-square text-3xl"></i>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-twitter-square text-3xl"></i>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-linkedin text-3xl"></i>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-instagram text-3xl"></i>
          </a>
        </div>
      </div>
    </div>
    );
};

export default Support;