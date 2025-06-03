import { observer } from 'mobx-react-lite';
import authStore from '../stores/authStore';
import { Spin } from 'antd';
import { Navigate, Outlet } from 'react-router';

const Loader = () => {
    return (
        <div className="fixed w-full h-full flex items-center justify-center">
            <Spin tip="Loading" size="large" />
        </div>
    );
};

export const RequireAuth = observer(() => {
    if (authStore.loading) return <Loader />;
    return authStore.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/signup" replace />
    );
});

export const RedirectIfAuthenticated = observer(() => {
    if (authStore.loading) return <Loader />;
    return !authStore.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard" replace />
    );
});
