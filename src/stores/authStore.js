import { makeAutoObservable } from 'mobx';
import { supabase } from '../api/Supabase';

class AuthStore {
    user = null;
    loading = true;
    error = null;
    message = null;

    constructor() {
        makeAutoObservable(this);
    }

    async checkSession() {
        this.loading = true;

        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session || !data.session.user.email_confirmed_at) {
            this.user = null;
        } else {
            this.user = data.session.user;
        }

        this.loading = false;
    }

    async signIn({ email, password }) {
        this.loading = true;
        this.error = null;
        this.message = null;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            this.error = error.message;
            this.user = null;
        } else if (!data.session?.user.email_confirmed_at) {
            this.message = 'Please confirm your email before signing in.';
            this.user = null;
        } else {
            this.user = data.session.user;
        }

        this.loading = false;
    }

    async signUp({ email, password }) {
        this.loading = true;
        this.error = null;
        this.message = null;

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            this.error = error.message;
        } else {
            this.message =
                'A confirmation email has been sent. Please verify your email address.';
        }

        this.loading = false;
    }

    async signOut() {
        await supabase.auth.signOut();
        this.user = null;
    }

    get isAuthenticated() {
        return !!this.user;
    }
}

const authStore = new AuthStore();
export default authStore;
