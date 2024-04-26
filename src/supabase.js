import { createClient } from '@supabase/supabase-js';

// Initialize a new Supabase client

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
