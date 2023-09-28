import * as React from 'react';
import Button from '@mui/material/Button';

export default function SecondaryButton({className = '', disabled, children, ...props }) {
    return (
        <a
            {...props}
            style={{ border: "0px ", backgroundColor: "transparent"}}
            className={
                `${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <Button>
                {children}
            </Button>
        </a>
    );
}
