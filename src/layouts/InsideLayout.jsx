import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const InsideLayout = () => {
    return (
        <div className="min-h-dvh pt-16 flex">
            <Sidebar />
            <main className="grow px-4 lg:px-8 bg-slate-100 dark:bg-transparent">
                <Outlet />
            </main>
        </div>
    );
};

export default InsideLayout;
