import React from 'react';
import { List } from 'antd';
import PersonCard from './PersonCard.jsx';

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
                    <List.Item key={item.id}>
                        <PersonCard
                            item={item}
                            removePerson={removePerson}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedPerson={setSelectedPerson}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PersonsCards;
