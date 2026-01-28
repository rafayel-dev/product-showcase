import React from 'react';
import { Typography } from 'antd';
import { FiPackage } from 'react-icons/fi';
import AppButton from './AppButton';

const { Title, Text } = Typography;

interface EmptyStateProps {
    message?: string;
    description?: string;
    onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = "No Products Found",
    description = "We couldn't find any products matching your criteria. Try clearing your filters or refreshing the page.",
    onReset
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-gray-50 border border-dashed border-gray-200 mt-8">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <FiPackage className="text-4xl text-gray-400" />
            </div>
            <Title level={3} className="mb-2! text-gray-700!">
                {message}
            </Title>
            <Text className="text-gray-500 max-w-md mb-6 block">
                {description}
            </Text>
            {onReset && (
                <AppButton type="primary" size="large" onClick={onReset} className="bg-violet-600 hover:bg-violet-700">
                    Clear Filters
                </AppButton>
            )}
        </div>
    );
};

export default EmptyState;
