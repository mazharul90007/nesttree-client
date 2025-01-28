import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h1 className="text-3xl font-bold text-blue-400">NestTree</h1>
                            <p className="mt-2">Your trusted real estate partner</p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center mb-6 md:mb-0">
                            <Link to={'/'}>
                                <p className="px-4 py-2 text-gray-300 hover:text-white">
                                    Home
                                </p>
                            </Link>
                            <Link to={'/allProperties'}>
                                <p className="px-4 py-2 text-gray-300 hover:text-white">
                                    Properties
                                </p>
                            </Link>
                            <Link to={'/support'}>
                                <p className="px-4 py-2 text-gray-300 hover:text-white">
                                    About Us
                                </p>
                            </Link>
                            <Link to={'/support'}>
                                <p className="px-4 py-2 text-gray-300 hover:text-white">
                                    Contact
                                </p>
                            </Link>
                        </div>

                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="text-center mt-6 text-sm text-gray-400">
                        <p>&copy; 2025 NestTree. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;