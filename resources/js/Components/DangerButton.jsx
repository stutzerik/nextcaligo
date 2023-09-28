import * as React from 'react';
import Button from '@mui/material/Button';

export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            style={{ border: "0px ", backgroundColor: "transparent"}}
            className={
                `${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <Button variant='contained' color="error">
                {children}
            </Button>
        </button>
    );
}
