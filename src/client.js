import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgmefetyzhncllzvnexy.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbWVmZXR5emhuY2xsenZuZXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5ODExMDUsImV4cCI6MjAyODU1NzEwNX0.qz_6wPqJilJFr7NJ1NCoekZY7ecjY_LqXYki1xqKtsk';

export const supabase = createClient(supabaseUrl, supabaseApiKey);

