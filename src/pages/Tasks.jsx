import PageTitle from '../ui/PageTitle';
import { LuPlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import tasksStore from '../stores/tasksStore';
import { Button } from 'antd';
import AddTaskModal from '../components/modals/AddTaskModal';
import TaskItem from '../components/TaskItem';
import useTasks from '../hooks/useTasks';

const Tasks = observer(({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
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
                    <TaskItem key={item.id} data={item} />
                ))}
            </div>
            <AddTaskModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
});

export default Tasks;
