import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import { observer } from 'mobx-react-lite';
import uiStore from '../stores/uiStore.js';

const InsideLayout = observer(() => {
    return (
        <div className="min-h-dvh pt-16 flex">
            <Sidebar />
            <main
                className={`grow px-4 lg:px-8 bg-slate-100 dark:bg-transparent md:ml-14 transition-all ${uiStore.menuOpen ? 'md:ml-[200px]' : ''}`}
            >
                <Outlet />
            </main>
        </div>
    );
});

export default InsideLayout;
