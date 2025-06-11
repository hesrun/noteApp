import React from 'react';
import { Button, Empty, Typography } from 'antd';
import { NavLink } from 'react-router';

const NotesCap = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Empty
                image="/notes.png"
                styles={{
                    image: {
                        height: 100,
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
                description={
                    <Typography.Title level={3}>
                        Notes list is empty
                    </Typography.Title>
                }
            >
                <NavLink to="add">
                    <Button color="cyan" variant="solid">
                        Add new note
                    </Button>
                </NavLink>
            </Empty>
        </div>
    );
};

export default NotesCap;
