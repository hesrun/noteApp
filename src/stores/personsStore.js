import { makeAutoObservable } from 'mobx';
import { supabase } from '../api/Supabase';
import authStore from './authStore';

const tableName = 'persons';

class PersonsStore {
    persons = null;
    loading = false;
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
            this.personData = data;
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

        const { error } = await supabase
            .from(tableName)
            .update(personData)
            .eq('id', id);

        if (error) {
            this.error = error;
        }

        this.loading = false;
    }
}

const personsStore = new PersonsStore();

export default personsStore;
