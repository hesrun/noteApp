import React from 'react';
import { Avatar, Button, Card, Dropdown, List } from 'antd';
import {
    LuEllipsisVertical,
    LuMail,
    LuMapPin,
    LuPencil,
    LuPhone,
    LuTrash,
} from 'react-icons/lu';

const PersonsCards = ({
    data,
    removePerson,
    setIsModalOpen,
    setSelectedPerson,
}) => {
    return (
        <div className="mt-4">
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            className="mb-3"
                            key={item.id}
                            title={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                    }}
                                >
                                    <Avatar
                                        src={item.photo_url}
                                        size={30}
                                        icon={
                                            !item.photo_url && <UserOutlined />
                                        }
                                    />
                                    <span>
                                        {item.first_name} {item.last_name}
                                    </span>
                                </div>
                            }
                            extra={
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: '1',
                                                label: (
                                                    <a
                                                        onClick={() => {
                                                            setSelectedPerson(
                                                                item
                                                            );
                                                            setIsModalOpen(
                                                                true
                                                            );
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
                                                        onClick={() =>
                                                            removePerson(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </a>
                                                ),
                                                icon: <LuTrash />,
                                                danger: true,
                                            },
                                        ],
                                    }}
                                    trigger={['click']}
                                >
                                    <Button
                                        icon={<LuEllipsisVertical />}
                                        type="text"
                                    />
                                </Dropdown>
                            }
                        >
                            <div className="grid gap-y-2">
                                <div className="flex items-center gap-2">
                                    <LuPhone className="text-lg text-gray-400" />
                                    {item.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <LuMail className="text-lg text-gray-400" />
                                    {item.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <LuMapPin className="text-lg text-gray-400" />
                                    {item.country}, {item.city}, {item.street}
                                </div>
                                <div>
                                    {item.description && (
                                        <p>{item.description}</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PersonsCards;
