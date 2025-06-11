import React, { useState } from 'react';
import { Avatar, Button, Card, Dropdown } from 'antd';
import {
    LuChevronDown,
    LuEllipsisVertical,
    LuMail,
    LuMapPin,
    LuPencil,
    LuPhone,
    LuTrash,
} from 'react-icons/lu';

const PersonCard = ({
    item,
    setIsModalOpen,
    removePerson,
    setSelectedPerson,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Card
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
                        icon={!item.photo_url && <UserOutlined />}
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
                                            setSelectedPerson(item);
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
                                    <a onClick={() => removePerson(item.id)}>
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
                    <Button icon={<LuEllipsisVertical />} type="text" />
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
                <div className="border-t border-gray-100 mt-4 pt-2 -mb-2">
                    {isExpanded && (
                        <div className="pt-4 pb-2">
                            {item.description && <p>{item.description}</p>}
                        </div>
                    )}
                    <Button
                        type="link"
                        block
                        icon={<LuChevronDown />}
                        iconPosition="end"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        Description
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default PersonCard;
