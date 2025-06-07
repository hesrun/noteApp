import PageTitle from '../ui/PageTitle';
import { Button, Dropdown, Empty, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import usePersons from '../hooks/usePersons.js';
import { LuEllipsisVertical, LuPencil, LuPlus, LuTrash } from 'react-icons/lu';
import AddPersonModal from '../components/modals/AddPersonModal.jsx';
import personsStore from '../stores/personsStore.js';
import { observer } from 'mobx-react-lite';

const Persons = observer(({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const { getPersons, removePerson } = usePersons();

    const columns = [
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
                    <Dropdown menu={{ items }} placement="bottomRight">
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

    useEffect(() => {
        getPersons();
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedPerson(null);
        }
    }, [isModalOpen]);

    console.log(personsStore.persons);

    return (
        <>
            {personsStore.persons?.length > 0 ? (
                <>
                    <PageTitle>{name}</PageTitle>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full max-w-60"
                        color="cyan"
                        variant="solid"
                        icon={<LuPlus />}
                    >
                        Add new Person
                    </Button>
                    <div className="mt-4">
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={personsStore.persons}
                            loading={personsStore.loading}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p style={{ margin: 0 }}>
                                        {record.description}
                                    </p>
                                ),
                                rowExpandable: (record) =>
                                    record.description !== null,
                            }}
                        />
                    </div>
                </>
            ) : (
                <div className="h-full flex items-center justify-center">
                    <Empty
                        image="/address-book.png"
                        styles={{
                            image: {
                                height: 100,
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        }}
                        description={
                            <Typography.Title level={3}>
                                Persons is empty
                            </Typography.Title>
                        }
                    >
                        <Button
                            color="cyan"
                            variant="solid"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add new person
                        </Button>
                    </Empty>
                </div>
            )}

            <AddPersonModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={selectedPerson}
            />
        </>
    );
});

export default Persons;
