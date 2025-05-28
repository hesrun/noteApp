import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Form, Input } from 'antd';
import PageTitle from '../ui/PageTitle';
import notesStore from '../stores/NotesStore';
import Editor from 'react-simple-wysiwyg';
import useNotes from '../hooks/useNotes';
const NoteEditor = observer(({ name }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { editNote, addNote } = useNotes();
    const [content, setContent] = useState('');
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        values.content = content;
        if (id) {
            editNote(id, values);
        } else {
            addNote(values);
        }
        navigate('/notes');
    };
    function onContentChange(e) {
        setContent(e.target.value);
    }

    useEffect(() => {
        if (id) {
            const currentNote = notesStore.notes?.find(
                (item) => item.id === id
            );
            if (currentNote) {
                setContent(currentNote.content);
                form.setFieldsValue({
                    title: currentNote.title,
                });
            }
        }
    }, [id]);

    return (
        <>
            <PageTitle back>{id ? 'Edit note' : 'New Note'}</PageTitle>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="w-full"
            >
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title',
                        },
                        {
                            validator: (_, value) =>
                                value && value.trim() !== ''
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error(
                                              'Title cannot be empty or spaces only'
                                          )
                                      ),
                        },
                    ]}
                >
                    <Input placeholder="Title" size="large" />
                </Form.Item>

                <Form.Item>
                    <Editor value={content} onChange={onContentChange} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="w-full max-w-60"
                        loading={notesStore.loading}
                    >
                        {id ? 'Save' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
});

export default NoteEditor;
