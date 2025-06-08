import {
    LuBookUser,
    LuCalendarDays,
    LuClipboardCheck,
    LuLayoutDashboard,
    LuNotebookText,
} from 'react-icons/lu';
import { useMediaQuery } from '@uidotdev/usehooks';
import { NavLink } from 'react-router';
import uiStore from '../stores/uiStore.js';
import { observer } from 'mobx-react-lite';

const nav = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: LuLayoutDashboard,
    },
    {
        name: 'Persons',
        url: '/persons',
        icon: LuBookUser,
    },
    {
        name: 'Notes',
        url: '/notes',
        icon: LuNotebookText,
    },
    {
        name: 'Tasks',
        url: '/tasks',
        icon: LuClipboardCheck,
    },
    {
        name: 'Calendar',
        url: '/calendar',
        icon: LuCalendarDays,
    },
];

const Sidebar = observer(() => {
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md text-sm transition ${
            isActive ? 'bg-slate-400/30 text-teal-500' : ''
        } hover:text-teal-500`;
    return (
        <aside
            className={`z-[4] fixed left-0 top-16 bottom-0 border-r bg-slate-100 dark:bg-[#141414] border-black/10 shrink-0 overflow-hidden dark:border-white/10 transition-all ${!uiStore.menuOpen ? 'w-0 md:w-14' : 'w-[200px]'}`}
        >
            <nav className="p-2">
                {nav.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.url}
                            className={linkClass}
                            onClick={() => {
                                isSmallDevice ? uiStore.closeMenu() : null;
                            }}
                        >
                            <Icon className="text-xl shrink-0" />
                            <span
                                className={`transition-opacity ${!uiStore.menuOpen ? 'opacity-0' : 'opacity-100'}`}
                            >
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
});

export default Sidebar;
