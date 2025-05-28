import { makeAutoObservable } from 'mobx';
import { supabase } from '../api/Supabase';
import authStore from './authStore';

const tableName = 'tasks';

class TasksStore {
    tasks = null;
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async addTask(taskData) {
        this.loading = true;
        this.error = null;

        const { data, error } = await supabase
            .from(tableName)
            .insert({
                user_id: authStore.user.id,
                ...taskData,
            })
            .select();

        if (error) {
            this.error = error;
        } else {
            console.log(data);
            this.tasks = [...this.tasks, ...data];
        }

        this.loading = false;
    }

    async getTasks() {
        this.loading = true;
        this.error = null;

        const { data, error } = await supabase.from(tableName).select();

        if (error) {
            this.error = error;
        } else {
            this.tasks = data;
        }
        this.loading = false;
    }

    async removeTask(id) {
        this.loading = true;
        this.error = null;

        const { error } = await supabase.from(tableName).delete().eq('id', id);

        if (error) {
            this.error = error;
        } else {
            this.tasks = this.tasks.filter((item) => item.id !== id);
        }

        this.loading = false;
    }

    async editTask(id, taskData) {
        this.loading = true;
        this.error = null;
        const { data, error } = await supabase
            .from(tableName)
            .update(taskData)
            .eq('id', id)
            .select();

        if (error) {
            this.error = error;
        } else if (data && data.length > 0) {
            const updatedTask = data[0];
            this.tasks = this.tasks.map((item) =>
                item.id === updatedTask.id ? updatedTask : item
            );
        }
        this.loading = false;
    }

    async toggleTask(id, isComplete) {
        this.loading = true;
        this.error = null;
        const { error } = await supabase
            .from(tableName)
            .update({ complete: isComplete })
            .eq('id', id);

        if (error) {
            this.error = error;
        } else {
            this.tasks = this.tasks.map((item) =>
                item.id === id ? { ...item, complete: !isComplete } : item
            );
        }
        this.loading = false;
    }
}

const tasksStore = new TasksStore();

export default tasksStore;
