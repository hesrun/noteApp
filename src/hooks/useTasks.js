import tasksStore from '../stores/tasksStore';
import useMessage from './useMessage';

const useTasks = () => {
    const { message } = useMessage();

    const getTasks = async () => {
        try {
            await tasksStore.getTasks();
            if (tasksStore.error) {
                message.error(tasksStore.error);
            }
        } catch (error) {
            message.error('Failed read tasks');
        }
    };
    const addTask = async (data) => {
        try {
            await tasksStore.addTask(data);
            if (!tasksStore.error) {
                message.success('Task was added');
            } else {
                message.error(tasksStore.error);
            }
        } catch (error) {
            message.error('Failed to add task');
        }
    };
    const removeTask = async (id) => {
        try {
            await tasksStore.removeTask(id);
            if (!tasksStore.error) {
                message.success('Task was deleted');
            } else {
                message.error(tasksStore.error);
            }
        } catch (error) {
            message.error('Failed to delete task');
        }
    };
    const editTask = async (id, data) => {
        try {
            await tasksStore.editTask(id, data);
            if (!tasksStore.error) {
                message.success('Task was edited');
            } else {
                message.error(tasksStore.error);
            }
        } catch (error) {
            message.error('Failed to edit task');
        }
    };
    const toggleTask = async (id, isComplete) => {
        try {
            await tasksStore.toggleTask(id, isComplete);
            if (!tasksStore.error) {
                message.success(
                    `Task was ${isComplete ? 'complete' : 'uncomplete'}`
                );
            } else {
                message.error(tasksStore.error);
            }
        } catch (error) {
            message.error('Failed to modified task');
        }
    };

    return { getTasks, addTask, removeTask, editTask, toggleTask };
};

export default useTasks;
