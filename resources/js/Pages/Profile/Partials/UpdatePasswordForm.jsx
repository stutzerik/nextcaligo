import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextField from '@mui/material/TextField';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <TextField
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        fullWidth
                        variant='filled'
                        autoComplete="current-password"
                        label="Current password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <TextField
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        fullWidth
                        variant='filled'
                        autoComplete="new-password"
                        label="New password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <TextField
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        fullWidth
                        variant='filled'
                        autoComplete="new-password"
                        label="Confirm password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
