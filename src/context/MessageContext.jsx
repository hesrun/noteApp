import { message, notification } from 'antd';
import { createContext } from 'react';

export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [notificationApi, notificationContextHolder] =
        notification.useNotification();

    const api = {
        message: messageApi,
        notification: notificationApi,
    };

    return (
        <MessageContext.Provider value={api}>
            {contextHolder}
            {notificationContextHolder}
            {children}
        </MessageContext.Provider>
    );
};
export default MessageProvider;
