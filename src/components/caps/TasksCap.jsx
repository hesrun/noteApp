import React from 'react';
import { Button, Empty, Typography } from 'antd';

const TasksCap = ({ capClick }) => {
    return (
        <div className="h-full flex items-center justify-center">
            <Empty
                image="/tasks.png"
                styles={{
                    image: {
                        height: 100,
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
                description={
                    <Typography.Title level={3}>
                        Tasks list is empty
                    </Typography.Title>
                }
            >
                <Button
                    color="cyan"
                    variant="solid"
                    onClick={() => capClick(true)}
                >
                    Create new task
                </Button>
            </Empty>
        </div>
    );
};

export default TasksCap;
