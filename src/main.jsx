import '@ant-design/v5-patch-for-react-19';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Main from './pages/Main.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import IndexLayout from './layouts/IndexLayout.jsx';
import {
    RedirectIfAuthenticated,
    RequireAuth,
} from './routes/ProtectedRoutes.jsx';
import { ConfigProvider, theme } from 'antd';
import InsideLayout from './layouts/InsideLayout.jsx';
import Notes from './pages/Notes.jsx';
import NoteEditor from './pages/NoteEditor.jsx';

import './styles/main.css';
import themeStore from './stores/themeStore.js';
import { observer } from 'mobx-react-lite';
import Tasks from './pages/Tasks.jsx';
import MessageProvider from './context/MessageContext.jsx';
import authStore from './stores/authStore.js';
import CalendarEvents from './pages/CalendarEvents.jsx';

const App = observer(() => {
    useEffect(() => {
        authStore.checkSession();
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    themeStore.theme === 'dark'
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
            }}
        >
            <MessageProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route element={<RequireAuth />}>
                                <Route element={<InsideLayout />}>
                                    <Route
                                        path="dashboard"
                                        element={<Dashboard name="Dashboard" />}
                                    />
                                    <Route
                                        path="notes"
                                        element={<Notes name="My notes" />}
                                    />
                                    <Route
                                        path="notes/add"
                                        element={<NoteEditor name="Add note" />}
                                    />
                                    <Route
                                        path="notes/:id/edit"
                                        element={<NoteEditor />}
                                    />
                                    <Route
                                        path="tasks"
                                        element={<Tasks name="My tasks" />}
                                    />
                                    <Route
                                        path="calendar"
                                        element={
                                            <CalendarEvents name="Calendar" />
                                        }
                                    />
                                </Route>
                            </Route>
                            <Route element={<RedirectIfAuthenticated />}>
                                <Route element={<IndexLayout />}>
                                    <Route index element={<Main />} />
                                    <Route path="signin" element={<SignIn />} />
                                    <Route path="signup" element={<SignUp />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </MessageProvider>
        </ConfigProvider>
    );
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
