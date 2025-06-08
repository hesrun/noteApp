import { observer } from 'mobx-react-lite';
import authStore from '../stores/authStore';
import { Navigate, Outlet } from 'react-router';

export const RequireAuth = observer(() => {
    if (authStore.loading) return null;
    return authStore.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/signup" replace />
    );
});

export const RedirectIfAuthenticated = observer(() => {
    if (authStore.loading) return null;
    return !authStore.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard" replace />
    );
});
