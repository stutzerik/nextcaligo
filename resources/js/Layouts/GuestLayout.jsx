import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    return (
        <div>
        <Navbar />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
                <p className='mt-2 py-4'>
                    Your IP address is logged for every account operation.
                </p>
            </div>
        <Footer />
        </div>
    );
}
