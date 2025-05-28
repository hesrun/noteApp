import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import authStore from '../stores/AuthStore';

const SignIn = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        await authStore.signIn(values);
        if (authStore.error) {
            messageApi.open({
                type: 'error',
                content: authStore.error,
            });
        }
    };

    const onFinishFailed = () => {
        messageApi.open({
            type: 'error',
            content: 'Fill out the form correctly',
        });
    };
    return (
        <>
            {contextHolder}
            <div className="m-auto bg-white p-8 shadow-2xl rounded-4xl w-full max-w-100 dark:bg-transparent dark:border dark:border-white/10 transition">
                <h1 className="text-2xl mb-6 text-center">Log in</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="w-full"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            { type: 'email', message: 'Invalid email format' },
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            size="large"
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message:
                                    'Password must be at least 6 characters',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            size="large"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            size="large"
                            htmlType="submit"
                            loading={authStore.loading}
                        >
                            {authStore.loading ? 'Loading' : 'Continue'}
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center">
                    <Button color="default" variant="link">
                        <Link to="/signup">I dont have Account</Link>
                    </Button>
                </div>
            </div>
        </>
    );
});

export default SignIn;
