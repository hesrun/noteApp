import { Calendar, Badge, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import useTasks from '../hooks/useTasks';
import { useEffect } from 'react';
import tasksStore from '../stores/tasksStore';
import {
    LuCheck,
    LuCircle,
    LuCircleCheck,
    LuCircleCheckBig,
} from 'react-icons/lu';

const CalendarEvents = observer(() => {
    const { getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasksByDay = (date) => {
        const dateStr = date.format('YYYY-MM-DD');
        return (
            tasksStore.tasks?.filter((event) => event.deadline === dateStr) ||
            []
        );
    };

    const getTasksByMonth = (date) => {
        const monthStr = date.format('YYYY-MM');
        return (
            tasksStore.tasks?.filter(
                (event) => event.deadline && event.deadline.startsWith(monthStr)
            ) || []
        );
    };

    const dateCellRender = (date) => {
        const listData = getTasksByDay(date);
        return (
            <ul className="space-y-2">
                {listData?.map((item) => (
                    <li
                        key={item.id}
                        className={` flex items-center px-2 py-1 gap-2 rounded-md text-sm  ${
                            item.complete
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 dark:bg-white/20'
                        }`}
                    >
                        {item.complete ? <LuCircleCheckBig /> : <LuCircle />}
                        {item.title}
                    </li>
                ))}
            </ul>
        );
    };

    const monthCellRender = (date) => {
        const listData = getTasksByMonth(date);
        if (listData.length === 0) return null;
        return (
            <ul className="flex flex-wrap gap-1 p-1">
                {listData?.map((item) => (
                    <li
                        key={item.id}
                        className={` flex items-center px-2 py-1 gap-2 rounded-md text-sm  ${
                            item.complete
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 dark:bg-white/20'
                        }`}
                    >
                        {item.complete ? <LuCircleCheckBig /> : <LuCircle />}
                        {item.title}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Spin spinning={tasksStore.loading} tip="Loading">
            <div className="mt-8 px-2 bg-white dark:bg-transparent">
                <Calendar
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            </div>
        </Spin>
    );
});

export default CalendarEvents;
