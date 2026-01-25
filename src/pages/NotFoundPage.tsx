import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/common/AppButton';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Result
                status="404"
                title="404"
                subTitle="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।"
                extra={
                    <AppButton type="primary" onClick={() => navigate('/')}>
                        Back Home
                    </AppButton>
                }
            />
        </div>
    );
};

export default NotFoundPage;
