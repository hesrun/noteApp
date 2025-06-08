import { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { observer } from 'mobx-react-lite';
import usePersons from '../../hooks/usePersons.js';
import personsStore from '../../stores/personsStore.js';

const AddPersonModal = observer(({ isModalOpen, setIsModalOpen, data }) => {
    const [form] = Form.useForm();
    const { addPerson, editPerson, uploadPhoto, resetPhoto } = usePersons();

    useEffect(() => {
        if (isModalOpen) {
            if (data) {
                form.setFieldsValue(data);
                personsStore.photoUrl = data.photo_url || null;
            } else {
                form.resetFields();
                resetPhoto();
            }
        }
    }, [data, isModalOpen]);

    const handleUpload = async (file) => {
        await uploadPhoto(file);
        return false;
    };

    const closeModal = () => {
        form.resetFields();
        resetPhoto();
        setIsModalOpen(false);
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = async (values) => {
        const combinedValues = {
            ...values,
            photo_url: personsStore.photoUrl,
        };
        if (!data) {
            await addPerson(combinedValues);
        } else {
            await editPerson(data.id, combinedValues);
        }
        form.resetFields();
        resetPhoto();
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            if (data) {
                form.setFieldsValue(data);
            } else {
                form.resetFields();
            }
        }
    }, [data, isModalOpen]);

    return (
        <>
            <Modal
                title={data ? 'Edit person' : 'New person'}
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
                        loading={personsStore.loading}
                    >
                        {personsStore.loading ? 'Loading' : 'Save'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item>
                        <Upload
                            style={{ margin: 'auto' }}
                            name="avatar"
                            listType="picture-circle"
                            fileList={
                                personsStore.photoUrl
                                    ? [
                                          {
                                              uid: '-1',
                                              name: 'avatar.png',
                                              status: 'done',
                                              url: personsStore.photoUrl,
                                          },
                                      ]
                                    : []
                            }
                            onRemove={() => resetPhoto()}
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                            }}
                            beforeUpload={handleUpload}
                        >
                            {!personsStore.photoUrl && (
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                        cursor: 'pointer',
                                    }}
                                    type="button"
                                >
                                    {personsStore.uploading ? (
                                        <LoadingOutlined />
                                    ) : (
                                        <PlusOutlined />
                                    )}
                                    <div>Avatar</div>
                                </button>
                            )}
                        </Upload>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col sm={24} md={12}>
                            <Form.Item
                                name="first_name"
                                label="First name"
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
                        </Col>
                        <Col sm={24} md={12}>
                            <Form.Item name="last_name" label="Last name">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col sm={24} md={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Invalid email format',
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12}>
                            <Form.Item name="phone" label="Phone number">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col sm={24} md={12}>
                            <Form.Item name="country" label="Country">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12}>
                            <Form.Item name="city" label="City">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col sm={24} md={18}>
                            <Form.Item name="street" label="Street, app number">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={6}>
                            <Form.Item name="zip" label="Post Code">
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="description" label="Description">
                        <TextArea rows={5} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});

export default AddPersonModal;
