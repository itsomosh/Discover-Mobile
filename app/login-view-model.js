import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { supabase } from './supabase';

export class LoginViewModel extends Observable {
    constructor() {
        super();
        this.email = "";
        this.password = "";
    }

    async login() {
        try {
            const { user, error } = await supabase.auth.signIn({
                email: this.email,
                password: this.password,
            });

            if (error) throw error;

            Frame.topmost().navigate({
                moduleName: "home-page",
                clearHistory: true
            });
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in. Please check your credentials and try again.');
        }
    }

    async signUp() {
        try {
            const { user, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password,
            });

            if (error) throw error;

            alert('Sign up successful! Please check your email to verify your account.');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Failed to sign up. Please try again.');
        }
    }
}