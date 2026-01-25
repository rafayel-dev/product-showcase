import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface AppButtonProps extends ButtonProps {
    // Add any custom props if needed
}

const AppButton: React.FC<AppButtonProps> = ({ className, children, type = 'default', ...props }) => {
    // Apply primary color override if type is primary
    // Also handle dangerous and other types if needed, but primarily focus on the violet theme
    const isPrimary = type === 'primary' && !props.danger;

    const baseClass = isPrimary
        ? "bg-violet-500! hover:bg-violet-600! border-violet-500! hover:border-violet-600! text-white shadow-md hover:shadow-lg transition-all duration-300"
        : "";

    return (
        <Button
            type={type}
            className={`${baseClass} ${className || ''}`}
            {...props}
        >
            {children}
        </Button>
    );
};

export default AppButton;
