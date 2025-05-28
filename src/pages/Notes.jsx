import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { observer } from 'mobx-react-lite';
import notesStore from '../stores/NotesStore';
import PageTitle from '../ui/PageTitle';
import { LuPlus } from 'react-icons/lu';
import NoteItem from '../components/NoteItem';
import { Button } from 'antd';
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
            <div className="flex items-center justify-between">
                <PageTitle>{name}</PageTitle>
            </div>
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
    );
});

export default Notes;
