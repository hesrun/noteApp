import { makeAutoObservable } from 'mobx';
import { supabase } from '../api/Supabase';
import authStore from './authStore';

const tableName = 'persons';

class PersonsStore {
    persons = null;
    loading = false;
    uploading = false;
    photoUrl = null;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getPersons() {
        this.loading = true;
        this.error = null;
        const { data, error } = await supabase.from(tableName).select();
        if (error) {
            this.error = error;
        } else {
            this.persons = data;
        }
        this.loading = false;
    }

    async addPerson(personData) {
        this.loading = true;
        this.error = null;

        const { data, error } = await supabase
            .from(tableName)
            .insert({
                user_id: authStore.user.id,
                ...personData,
            })
            .select();

        if (error) {
            this.error = error;
        } else {
            this.persons = [...this.persons, ...data];
        }

        this.loading = false;
    }

    async removePerson(id) {
        this.loading = true;
        this.error = null;

        const { error } = await supabase.from(tableName).delete().eq('id', id);

        if (error) {
            this.error = error;
        } else {
            this.persons = this.persons.filter((item) => item.id !== id);
        }

        this.loading = false;
    }

    async editPerson(id, personData) {
        this.loading = true;
        this.error = null;

        const { data, error } = await supabase
            .from(tableName)
            .update(personData)
            .eq('id', id)
            .select();

        if (error) {
            this.error = error;
        } else if (data && data.length > 0) {
            const updatedPerson = data[0];
            this.persons = this.persons.map((item) =>
                item.id === updatedPerson.id ? updatedPerson : item
            );
        }

        this.loading = false;
    }

    async uploadPhoto(file) {
        this.uploading = true;
        this.error = null;

        const fileExt = file.name.split('.').pop();
        const filename = `${Date.now()}.${fileExt}`;
        const filePath = `${filename}`;

        const { error } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (error) {
            this.error = error.message || 'Upload failed';
            this.uploading = false;
            return null;
        }
        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
        this.photoUrl = data.publicUrl;
        this.uploading = false;
        return this.photoUrl;
    }
    resetPhoto() {
        this.photoUrl = null;
    }
}

const personsStore = new PersonsStore();

export default personsStore;
