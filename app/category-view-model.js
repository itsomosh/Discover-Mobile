import { Observable } from '@nativescript/core';
import { supabase } from './supabase';

export class CategoryViewModel extends Observable {
    constructor(categoryName) {
        super();
        this.categoryName = categoryName;
        this.items = [];
        this.fetchItemsForCategory(categoryName);
    }

    async fetchItemsForCategory(category) {
        try {
            const { data, error } = await supabase
                .from('places')
                .select('*')
                .eq('category', category);

            if (error) throw error;

            this.set('items', data);
        } catch (error) {
            console.error('Error fetching category items:', error);
            this.set('items', []);
        }
    }
}