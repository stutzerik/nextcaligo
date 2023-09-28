import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My account</h2>}
        >
            <Head title="My account" />

            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} style={{marginTop: "16px"}}>
                                <Tab label="Profile" value="1" />
                                <Tab label="Change password" value="2" />
                                <Tab label="Delete account" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <UpdatePasswordForm className="max-w-xl" />
                        </TabPanel>
                        <TabPanel value="3">
                            <DeleteUserForm className="max-w-xl" />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
