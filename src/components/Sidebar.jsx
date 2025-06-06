import {
    LuBookUser,
    LuCalendarDays,
    LuClipboardCheck,
    LuLayoutDashboard,
    LuNotebookText,
} from 'react-icons/lu';
import { NavLink } from 'react-router';

const Sidebar = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md hover:bg-slate-400/10 text-sm transition ${
            isActive ? 'bg-slate-400/50' : ''
        }`;
    return (
        <aside className="border-r border-black/10 w-[200px] p-2 dark:border-white/10">
            <nav className="sticky top-[4.5rem]">
                <NavLink to="/dashboard" className={linkClass}>
                    <LuLayoutDashboard className="text-xl" />
                    Dashboard
                </NavLink>
                <NavLink to="/persons" className={linkClass}>
                    <LuBookUser className="text-xl" />
                    Persons
                </NavLink>
                <NavLink to="/notes" className={linkClass}>
                    <LuNotebookText className="text-xl" />
                    Notes
                </NavLink>
                <NavLink to="/tasks" className={linkClass}>
                    <LuClipboardCheck className="text-xl" />
                    Tasks
                </NavLink>
                <NavLink to="/calendar" className={linkClass}>
                    <LuCalendarDays className="text-xl" />
                    Calendar
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
