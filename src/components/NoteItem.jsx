import { Button, Dropdown } from 'antd';
import { LuPencil, LuTrash, LuEllipsisVertical } from 'react-icons/lu';
import HtmlContent from './HtmlContent';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router';
import useNotes from '../hooks/useNotes';

const NoteItem = observer(({ data, isOpen, onToggle }) => {
    const { removeNote } = useNotes();
    const items = [
        {
            key: '1',
            label: <NavLink to={`/notes/${data.id}/edit`}>Edit</NavLink>,
            icon: <LuPencil />,
        },
        {
            key: '2',
            label: (
                <a
                    className="text-red-600"
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        removeNote(data.id);
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
                <div className="flex justify-between items-center">
                    <h3
                        className="px-4 py-4 font-medium grow cursor-pointer"
                        onClick={onToggle}
                    >
                        {data.title}
                    </h3>
                    <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        className="mr-2"
                    >
                        <Button
                            shape="circle"
                            type="text"
                            icon={<LuEllipsisVertical />}
                        ></Button>
                    </Dropdown>
                </div>
                {isOpen && (
                    <div className="px-4 py-4 text-sm border-t border-black/5 dark:border-white/10">
                        <HtmlContent>{data.content}</HtmlContent>
                    </div>
                )}
            </div>
        </>
    );
});

export default NoteItem;
