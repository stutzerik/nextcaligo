import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { TextField, Typography } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>

                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        variant='filled'
                        label="Email address"
                        fullWidth
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        variant='filled'
                        label="Password"
                        fullWidth
                        value={data.password}
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">

                    <TextField
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        variant='filled'
                        label="Password again"
                        fullWidth
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
