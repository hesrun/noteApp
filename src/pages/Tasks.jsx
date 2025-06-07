import PageTitle from '../ui/PageTitle';
import { LuPlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import tasksStore from '../stores/tasksStore';
import { Button, Empty, Typography } from 'antd';
import AddTaskModal from '../components/modals/AddTaskModal';
import TaskItem from '../components/TaskItem';
import useTasks from '../hooks/useTasks';

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
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create new task
                        </Button>
                    </Empty>
                </div>
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
