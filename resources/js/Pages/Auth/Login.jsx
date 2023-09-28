import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import {TextField, Checkbox, FormGroup, FormControlLabel, Link, Typography} from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Sign in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Typography variant="h2" component="h2" style={{marginBottom: "24px", textAlign: "center"}}>
                Sign in
            </Typography>

            <form onSubmit={submit}>
                <div>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        variant='filled'
                        fullWidth
                        label="Email address"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        variant='filled'
                        fullWidth
                        label="Password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <FormGroup>
                            <FormControlLabel                             
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)} 
                                control={<Checkbox />} 
                                label="Remember this device" 
                            />
                        </FormGroup>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Sign in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
