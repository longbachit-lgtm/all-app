import { createClient } from '@supabase/supabase-js';
import { AppData } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Data persistence will be local only.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Helper functions for common operations
export const supabaseService = {
    async fetchApps() {
        const { data, error } = await supabase
            .from('apps')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as AppData[];
    },

    async addApp(app: AppData) {
        const { error } = await supabase
            .from('apps')
            .insert([app]);

        if (error) throw error;
    },

    async updateApp(app: AppData) {
        const { error } = await supabase
            .from('apps')
            .update(app)
            .eq('id', app.id);

        if (error) throw error;
    },

    async deleteApp(id: string) {
        const { error } = await supabase
            .from('apps')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async uploadThumbnail(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('app-assets')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('app-assets')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
