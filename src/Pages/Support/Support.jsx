import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";

const Support = () => {
  const { dayTheme } = useAuth();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardHover = {
    scale: 1.03,
    transition: { duration: 0.3 }
  };

  return (
    <div className={`min-h-screen py-12 ${!dayTheme ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          How Can We Help You?
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Our dedicated support team is ready to assist you with any questions about properties, payments, or your account.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 lg:px-8 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Phone Support */}
          <motion.div
            variants={item}
            whileHover={cardHover}
            className={`p-8 rounded-2xl shadow-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
              <FaPhoneAlt size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Phone Support</h3>
            <p className={`text-center mb-4 ${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Speak directly with our real estate specialists
            </p>
            <a 
              href="tel:+8801949662167" 
              className="block text-center text-blue-600 font-medium text-lg hover:text-blue-700 transition-colors"
            >
              (+88) 01949662167
            </a>
            <p className={`text-center mt-2 text-sm ${!dayTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              Available 24/7 for urgent inquiries
            </p>
          </motion.div>

          {/* Email Support */}
          <motion.div
            variants={item}
            whileHover={cardHover}
            className={`p-8 rounded-2xl shadow-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
              <FaEnvelope size={24} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Email Support</h3>
            <p className={`text-center mb-4 ${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Get detailed responses within 24 hours
            </p>
            <a 
              href="mailto:support@nesttree.com" 
              className="block text-center text-purple-600 font-medium text-lg hover:text-purple-700 transition-colors"
            >
              support@nesttree.com
            </a>
            <p className={`text-center mt-2 text-sm ${!dayTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              For non-urgent inquiries and documentation
            </p>
          </motion.div>

          {/* Visit Us */}
          <motion.div
            variants={item}
            whileHover={cardHover}
            className={`p-8 rounded-2xl shadow-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
              <FaMapMarkerAlt size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Visit Our Office</h3>
            <p className={`text-center mb-4 ${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Schedule an in-person consultation
            </p>
            <p className="text-center text-green-600 font-medium text-lg">
              123 NestTree St, Dhanmondi, Dhaka
            </p>
            <p className={`text-center mt-2 text-sm ${!dayTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              By appointment only
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Office Hours */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-6 lg:px-8 mb-16"
      >
        <div className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                <FaClock size={32} className="text-orange-500" />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Our Office Hours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="font-semibold">Monday - Friday</p>
                  <p className={`${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>9:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Saturday</p>
                  <p className={`${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>10:00 AM - 2:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Sunday</p>
                  <p className={`${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 lg:px-8"
      >
        <div className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={`block mb-2 font-medium ${!dayTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-3 rounded-lg border ${!dayTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={`block mb-2 font-medium ${!dayTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-lg border ${!dayTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={`block mb-2 font-medium ${!dayTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className={`w-full px-4 py-3 rounded-lg border ${!dayTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="How can we help?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className={`block mb-2 font-medium ${!dayTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                className={`w-full px-4 py-3 rounded-lg border ${!dayTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe your inquiry in detail..."
                required
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <FiSend size={18} />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-6 lg:px-8 mt-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              question: "How do I schedule a property viewing?",
              answer: "You can request a viewing directly through the property listing page. Our team will contact you within 24 hours to confirm the appointment."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, bank transfers, and mobile banking services. For installment plans, please contact our sales team."
            },
            {
              question: "How can I verify a property's legal status?",
              answer: "All properties listed on NestTree undergo preliminary legal verification. For complete due diligence, we recommend consulting with our legal partners."
            },
            {
              question: "What if I need to cancel a purchase agreement?",
              answer: "Cancellation policies vary by property. Please review the terms before signing or contact our support team for assistance."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              className={`p-6 rounded-xl ${!dayTheme ? 'bg-gray-800' : 'bg-white'} shadow-md cursor-pointer`}
            >
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className={`${!dayTheme ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Support;