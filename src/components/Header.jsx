import { Button, Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/AuthStore';
import themeStore from '../stores/themeStore';
import { LuSun, LuMoon } from 'react-icons/lu';

const Header = observer(() => {
    const logOut = (e) => {
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
        <header className="z-1 fixed top-0 w-full flex items-center h-16 px-4 bg-slate-200 shadow-md shadow-black/5 dark:bg-transparent dark:border-b dark:border-white/10 transition-colors">
            <Link className="mr-auto" to="/">
                Logo
            </Link>
            {authStore.isAuthenticated ? (
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="link">{authStore.user.email}</Button>
                </Dropdown>
            ) : (
                <Button color="default" variant="solid">
                    <Link to="signup">Sign up</Link>
                </Button>
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
