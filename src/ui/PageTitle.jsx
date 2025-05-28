import { Button } from 'antd';
import { LuMoveLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router';

const PageTitle = ({ back, children }) => {
    const navigate = useNavigate();
    return (
        <div className="my-4">
            {back && (
                <button
                    className="flex items-center gap-2 mb-2 text-gray-500 hover:text-blue-500 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <LuMoveLeft /> <span className="">Back</span>
                </button>
            )}
            <h1 className="text-2xl font-medium">{children}</h1>
        </div>
    );
};

export default PageTitle;
