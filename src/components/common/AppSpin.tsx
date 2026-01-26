import React from 'react';
import { Spin } from 'antd';

const AppSpin: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <Spin size="large" />
        </div>
    );
};

export default AppSpin;
