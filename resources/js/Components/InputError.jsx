import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function InputError({ message, ...props }) {
    return message ? (
        <Alert severity="error" {...props}>
            {message}
        </Alert>
    ) : null;
}