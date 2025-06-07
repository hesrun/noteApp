import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { observer } from 'mobx-react-lite';
import notesStore from '../stores/NotesStore';
import PageTitle from '../ui/PageTitle';
import { LuPlus } from 'react-icons/lu';
import NoteItem from '../components/NoteItem';
import { Button, Empty, Typography } from 'antd';
import useNotes from '../hooks/useNotes';

const Notes = observer(({ name }) => {
    const { getNotes } = useNotes();
    const [openedNoteId, setOpenedNoteId] = useState(null);

    const handleCollapseNote = (id) => {
        setOpenedNoteId((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            {notesStore.notes?.length > 0 ? (
                <>
                    <PageTitle>{name}</PageTitle>
                    <NavLink to="add">
                        <Button
                            className="w-full max-w-60"
                            color="cyan"
                            variant="solid"
                            icon={<LuPlus />}
                        >
                            Add new note
                        </Button>
                    </NavLink>
                    <div className="space-y-4 mt-4">
                        {notesStore.notes?.map((item) => (
                            <NoteItem
                                key={item.id}
                                data={item}
                                isOpen={openedNoteId === item.id}
                                onToggle={() => handleCollapseNote(item.id)}
                            />
                        ))}
                    </div>
                </>
            ) : (
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
            )}
        </>
    );
});

export default Notes;
