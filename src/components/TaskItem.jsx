import { Badge, Button, Dropdown } from 'antd';
import { LuCheck, LuEllipsisVertical, LuPencil, LuTrash } from 'react-icons/lu';
import formatDateEn from '../utils/formatDateEn';
import daysDiff from '../utils/daysDifference';
import { useState } from 'react';
import useTasks from '../hooks/useTasks';

const TaskItem = ({ data, setIsModalOpen, setCurrentTask }) => {
    const [isComplete, setIsComplete] = useState(data.complete);
    const { removeTask, toggleTask } = useTasks();

    const items = [
        {
            key: '1',
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setIsModalOpen(true);
                        setCurrentTask(data);
                    }}
                >
                    Edit
                </a>
            ),
            icon: <LuPencil />,
        },
        {
            key: '2',
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        removeTask(data.id);
                    }}
                >
                    Remove
                </a>
            ),
            icon: <LuTrash />,
            danger: true,
        },
    ];
    return (
        <>
            <div className="rounded-2xl bg-white shadow-md shadow-gray-200 hover:shadow-md hover:shadow-gray-300 transition-all dark:bg-transparent dark:!shadow-none dark:border border-white/10">
                <div className="flex items-center gap-4 px-4 py-4">
                    <label
                        tabIndex={0}
                        htmlFor={data.id}
                        className="grow flex gap-4 cursor-pointer"
                    >
                        <input
                            className="hidden"
                            id={data.id}
                            type="checkbox"
                            checked={isComplete}
                            onChange={() => {
                                setIsComplete(!isComplete);
                                toggleTask(data.id, !isComplete);
                            }}
                        />
                        <div
                            className={`block relative w-6 h-6 border-2 rounded-full ${
                                isComplete
                                    ? 'border-green-600 bg-green-600 text-white'
                                    : 'border-gray-500'
                            }`}
                        >
                            {isComplete && (
                                <LuCheck className="absolute left-1/2 top-1/2 -translate-1/2 text-sm" />
                            )}
                        </div>
                        <div>
                            <div
                                className={`font-medium ${
                                    isComplete && 'line-through opacity-50'
                                }`}
                            >
                                {data.title}
                            </div>
                            <div className="text-sm">{data.description}</div>
                        </div>
                    </label>
                    {data.deadline && (
                        <div className="flex items-baseline gap-2">
                            <div className="text-sm text-gray-400">
                                Deadline
                            </div>

                            <Badge
                                count={formatDateEn(data.deadline)}
                                color={
                                    daysDiff(data.deadline) > 3
                                        ? '#84cc16'
                                        : '#ef4444'
                                }
                            />
                        </div>
                    )}
                    <div>
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Button
                                shape="circle"
                                type="text"
                                icon={<LuEllipsisVertical />}
                            ></Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskItem;
