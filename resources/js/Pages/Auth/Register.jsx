import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Register" />
                <div>
                  Sorry, registration not allowed.
                </div>
        </GuestLayout>
    );
}
