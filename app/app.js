import { Application } from '@nativescript/core';
import { supabase } from './supabase';

Application.on(Application.launchEvent, () => {
    const session = supabase.auth.session();
    if (!session) {
        Application.navigate({
            moduleName: "login-page",
            clearHistory: true
        });
    }
});

Application.run({ moduleName: 'app-root' });