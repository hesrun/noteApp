import PageTitle from '../ui/PageTitle';
import { LuPlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import tasksStore from '../stores/tasksStore';
import { Button } from 'antd';
import AddTaskModal from '../components/modals/AddTaskModal';
import TaskItem from '../components/TaskItem';
import useTasks from '../hooks/useTasks';
import TasksCap from '../components/caps/TasksCap.jsx';

const Tasks = observer(({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const { getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            setCurrentTask(null);
        }
    }, [isModalOpen]);

    return (
        <>
            {tasksStore.tasks?.length > 0 ? (
                <>
                    <PageTitle>{name}</PageTitle>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full max-w-60"
                        color="cyan"
                        variant="solid"
                        icon={<LuPlus />}
                    >
                        Add new task
                    </Button>
                    <div className="space-y-4 mt-4">
                        {tasksStore.tasks?.map((item) => (
                            <TaskItem
                                key={item.id}
                                data={item}
                                setIsModalOpen={setIsModalOpen}
                                setCurrentTask={setCurrentTask}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <TasksCap capClick={setIsModalOpen} />
            )}
            <AddTaskModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={currentTask}
            />
        </>
    );
});

export default Tasks;
