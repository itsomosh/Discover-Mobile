import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmbmddoachpdtryaygpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYm1kZG9hY2hwZHRyeWF5Z3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NjA2NjAsImV4cCI6MjA0NDMzNjY2MH0.Si9zAtY4iIzWqw2Lm2-r4n0CQYvWTkhb0TvznEv-ch8';

export const supabase = createClient(supabaseUrl, supabaseKey);