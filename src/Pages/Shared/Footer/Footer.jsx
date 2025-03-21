import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Footer = () => {
    const {user, dayTheme} = useAuth();
    return (
        <div>
            <footer className={` text-white py-6 ${dayTheme ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h1 className="text-3xl font-bold text-blue-400">NestTree</h1>
                            <p className="mt-2">Your most trusted real estate partner</p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center mb-6 md:mb-0">
                            <Link to={'/'}>
                                <p className="px-4 py-2 text-gray-300 hover:text-white">
                                    Home
                                </p>
                            </Link>
                            <Link to={ user?.email ? '/allProperties' : '/login'}>
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