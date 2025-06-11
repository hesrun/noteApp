import React from 'react';
import { Button, Empty, Typography } from 'antd';

const PersonCap = ({ capClick }) => {
    return (
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
                    onClick={() => capClick(true)}
                >
                    Add new person
                </Button>
            </Empty>
        </div>
    );
};

export default PersonCap;
