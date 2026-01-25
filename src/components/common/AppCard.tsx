import React from 'react';
import { Card } from 'antd';
import type { CardProps } from 'antd';

const AppCard: React.FC<CardProps> = ({ className, children, bordered = false, ...props }) => {
    return (
        <Card
            bordered={bordered}
            className={`rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className || ''}`}
            {...props}
        >
            {children}
        </Card>
    );
};

export default AppCard;
