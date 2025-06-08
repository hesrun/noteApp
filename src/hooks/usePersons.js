import useMessage from './useMessage';
import personsStore from '../stores/personsStore';

const usePersons = () => {
    const { message } = useMessage();

    const getPersons = async () => {
        try {
            await personsStore.getPersons();
            if (personsStore.error) {
                message.error(personsStore.error);
            }
        } catch (error) {
            message.error('Failed read persons');
        }
    };

    const addPerson = async (data) => {
        try {
            await personsStore.addPerson(data);
            if (!personsStore.error) {
                message.success('Person is added');
            } else {
                message.error(personsStore.error);
            }
        } catch (error) {
            message.error('Failed add person');
        }
    };

    const removePerson = async (id) => {
        try {
            await personsStore.removePerson(id);
            if (!personsStore.error) {
                message.success('Person is deleted');
            } else {
                message.error(personsStore.error);
            }
        } catch (error) {
            message.error('Failed to delete person');
        }
    };

    const editPerson = async (id, data) => {
        try {
            await personsStore.editPerson(id, data);
            if (!personsStore.error) {
                message.success('Person was edited');
            } else {
                message.error(personsStore.error);
            }
        } catch (error) {
            message.error('Failed to edit Person');
        }
    };

    const uploadPhoto = async (file) => {
        await personsStore.uploadPhoto(file);
        if (personsStore.photoUrl) {
            message.success('Photo uploaded');
        } else {
            message.error(personsStore.error || 'Upload failed');
        }
    };

    const resetPhoto = () => {
        personsStore.resetPhoto();
    };

    return {
        getPersons,
        addPerson,
        removePerson,
        editPerson,
        uploadPhoto,
        resetPhoto,
    };
};
export default usePersons;
