import { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import tasksStore from '../../stores/tasksStore';
import useTasks from '../../hooks/useTasks';

const AddTaskModal = observer(({ isModalOpen, setIsModalOpen, data }) => {
    const [form] = Form.useForm();
    const { addTask, editTask } = useTasks();

    const closeModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = async (values) => {
        if (!data) {
            addTask(values);
        } else {
            editTask(data.id, values);
        }
        form.resetFields();
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            if (data) {
                form.setFieldsValue({
                    ...data,
                    deadline: data.deadline ? dayjs(data.deadline) : null,
                });
            } else {
                form.resetFields();
            }
        }
    }, [data, isModalOpen]);

    return (
        <>
            <Modal
                title={data ? 'Edit task' : 'Add task'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={closeModal}
                footer={[
                    <Button
                        key="back"
                        variant="link"
                        color="default"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        variant="solid"
                        color="cyan"
                        onClick={handleOk}
                        loading={tasksStore.loading}
                    >
                        {tasksStore.loading ? 'Loading' : 'Save'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Task Title"
                        rules={[
                            {
                                required: true,
                                message: 'Must be not empty',
                            },
                            {
                                validator: (_, value) =>
                                    value && value.trim() !== ''
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Title cannot be empty or spaces only'
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item name="deadline" label="Deadline date">
                        <DatePicker minDate={dayjs()} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={5} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});

export default AddTaskModal;
