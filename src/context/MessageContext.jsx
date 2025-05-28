import { message } from 'antd';
import { createContext } from 'react';

export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <MessageContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};
export default MessageProvider;
