import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://clzkglktuzoibiyathah.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsemtnbGt0dXpvaWJpeWF0aGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTkxMTQsImV4cCI6MjA2MzA3NTExNH0.Hr8GEK2sucdgZ8pOCMZvvUMHh4X4uMLyVEH2DQ7g4NI'
);
