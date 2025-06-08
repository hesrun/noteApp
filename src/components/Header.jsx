import { Button, Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/AuthStore';
import themeStore from '../stores/themeStore';
import uiStore from '../stores/uiStore.js';
import {
    LuMoon,
    LuPanelLeftClose,
    LuPanelLeftOpen,
    LuSun,
} from 'react-icons/lu';

const Header = observer(() => {
    const logOut = () => {
        (e) => e.preventDefault();
        authStore.signOut();
    };

    const items = [
        {
            keys: '1',
            label: <a onClick={logOut}>Logout</a>,
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <header className="z-10 fixed top-0 w-full flex items-center h-16 px-4 bg-slate-200 shadow-md shadow-black/5 dark:bg-transparent dark:border-b dark:border-white/10 transition-colors">
            {authStore.user && (
                <button
                    onClick={() => uiStore.toggleMenu()}
                    className="p-2 -ml-2 text-xl mr-3 cursor-pointer"
                >
                    {uiStore.menuOpen ? (
                        <LuPanelLeftClose />
                    ) : (
                        <LuPanelLeftOpen />
                    )}
                </button>
            )}
            <Link className="mr-auto h-8" to="/">
                <img className="h-full" src="/logo.png" alt="logo" />
            </Link>
            {authStore.isAuthenticated ? (
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="link">{authStore.user.email}</Button>
                </Dropdown>
            ) : (
                <Link to="signup">
                    <Button color="default" variant="solid">
                        Sign up
                    </Button>
                </Link>
            )}
            <Button
                type="primary"
                shape="circle"
                className="ml-4"
                onClick={() => themeStore.toggleTheme()}
            >
                {themeStore.theme !== 'dark' ? <LuSun /> : <LuMoon />}
            </Button>
        </header>
    );
});

export default Header;
