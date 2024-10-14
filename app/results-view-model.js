import { Observable } from '@nativescript/core';
import { Dialogs } from '@nativescript/core';
import { supabase } from './supabase';

export class ResultsViewModel extends Observable {
    constructor(searchQuery) {
        super();
        this.searchQuery = searchQuery;
        this.results = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.totalResults = 0;
        this.sortOption = 'relevance';
        this.sortButtonText = 'Sort: Relevance';
        this.filters = {};

        this.fetchResults();
    }

    async fetchResults() {
        try {
            let query = supabase
                .from('places')
                .select('*', { count: 'exact' })
                .ilike('name', `%${this.searchQuery}%`)
                .range((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage - 1);

            // Apply sorting
            if (this.sortOption === 'price: low to high') {
                query = query.order('price', { ascending: true });
            } else if (this.sortOption === 'price: high to low') {
                query = query.order('price', { ascending: false });
            } else if (this.sortOption === 'rating') {
                query = query.order('rating', { ascending: false });
            }

            // Apply filters
            Object.entries(this.filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });

            const { data, error, count } = await query;

            if (error) throw error;

            this.results = data;
            this.totalResults = count;
            this.updatePaginationInfo();
        } catch (error) {
            console.error('Error fetching results:', error);
            Dialogs.alert({
                title: 'Error',
                message: 'Failed to fetch results. Please try again.',
                okButtonText: 'OK'
            });
        }
    }

    // ... (keep other methods the same)

    async showFilters() {
        // In a real app, you'd create a proper filter UI
        const result = await Dialogs.prompt({
            title: 'Filters',
            message: 'Enter category (e.g., hotel, restaurant):',
            okButtonText: 'Apply',
            cancelButtonText: 'Cancel',
            inputType: Dialogs.inputType.text
        });

        if (result.result) {
            this.filters = { category: result.text };
            this.currentPage = 1;
            this.fetchResults();
        }
    }
}