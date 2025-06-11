import React from 'react';
import { Avatar, Button, Dropdown, Table } from 'antd';
import { LuEllipsisVertical, LuPencil, LuTrash } from 'react-icons/lu';

const PersonsTable = ({
    data,
    loading,
    removePerson,
    setIsModalOpen,
    setSelectedPerson,
}) => {
    const columns = [
        {
            title: '',
            dataIndex: 'photo_url',
            key: 'avatar',
            onCell: () => ({
                style: {
                    padding: 0,
                    width: 60,
                    maxWidth: 60,
                    textAlign: 'center',
                },
            }),
            render: (url) =>
                url ? (
                    <Avatar src={url} size={40} />
                ) : (
                    <Avatar icon={<UserOutlined />} size={40} />
                ),
        },
        {
            title: 'First name',
            dataIndex: 'first_name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'city',
            dataIndex: 'city',
        },
        {
            title: 'street',
            dataIndex: 'street',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                const items = [
                    {
                        key: '1',
                        label: (
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedPerson(record);
                                    setIsModalOpen(true);
                                }}
                            >
                                Edit
                            </a>
                        ),
                        icon: <LuPencil />,
                    },
                    {
                        key: '2',
                        label: (
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    removePerson(record.id);
                                }}
                            >
                                Remove
                            </a>
                        ),
                        icon: <LuTrash />,
                        danger: true,
                    },
                ];
                return (
                    <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Button
                            shape="circle"
                            type="text"
                            icon={<LuEllipsisVertical />}
                        ></Button>
                    </Dropdown>
                );
            },
        },
    ];
    return (
        <div className="mt-4">
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                loading={loading}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                    rowExpandable: (record) => record.description !== null,
                }}
            />
        </div>
    );
};

export default PersonsTable;
