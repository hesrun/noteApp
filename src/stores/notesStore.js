import { makeAutoObservable } from 'mobx';
import { supabase } from '../api/Supabase';
import authStore from './authStore';

const tableName = 'notes';

class NotesStore {
    notes = null;
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getNotes() {
        this.loading = true;
        this.error = null;
        const { data, error } = await supabase.from(tableName).select();
        if (error) {
            this.error = error;
        } else {
            this.notes = data;
        }
        this.loading = false;
    }

    async addNote(noteData) {
        this.loading = true;
        this.error = null;

        const { data, error } = await supabase
            .from(tableName)
            .insert({
                user_id: authStore.user.id,
                ...noteData,
            })
            .select();

        if (error) {
            this.error = error;
        } else {
            this.notes = data;
        }

        this.loading = false;
    }

    async removeNote(id) {
        this.loading = true;
        this.error = null;

        const { error } = await supabase.from(tableName).delete().eq('id', id);

        if (error) {
            this.error = error;
        } else {
            this.notes = this.notes.filter((item) => item.id !== id);
        }

        this.loading = false;
    }

    async editNote(id, noteData) {
        this.loading = true;
        this.error = null;

        const { error } = await supabase
            .from(tableName)
            .update(noteData)
            .eq('id', id);

        if (error) {
            this.error = error;
        }

        this.loading = false;
    }
}

const notesStore = new NotesStore();

export default notesStore;
