import useMessage from './useMessage';
import notesStore from '../stores/notesStore';

const useNotes = () => {
    const { message } = useMessage();

    const getNotes = async () => {
        try {
            await notesStore.getNotes();
            if (notesStore.error) {
                message.error(notesStore.error);
            }
        } catch (error) {
            message.error('Failed read notes');
        }
    };

    const addNote = async (data) => {
        try {
            await notesStore.addNote(data);
            if (!notesStore.error) {
                message.success('Note is added');
            } else {
                message.error(notesStore.error);
            }
        } catch (error) {
            message.error('Failed add note');
        }
    };

    const removeNote = async (id) => {
        try {
            await notesStore.removeNote(id);
            if (!notesStore.error) {
                message.success('Note is deleted');
            } else {
                message.error(notesStore.error);
            }
        } catch (error) {
            message.error('Failed to delete note');
        }
    };

    const editNote = async (id, data) => {
        try {
            await notesStore.editNote(id, data);
            if (!notesStore.error) {
                message.success('Note was edited');
            } else {
                message.error(notesStore.error);
            }
        } catch (error) {
            message.error('Failed to edit note');
        }
    };

    return { getNotes, addNote, removeNote, editNote };
};
export default useNotes;
