import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnbvlfjuwxneybtfgqwb.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYnZsZmp1d3huZXlidGZncXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxNjIxMjEsImV4cCI6MTk5NDczODEyMX0.QVWbesKkjDJli9JkALbH8Ei93qIFdBOb3T7zXIXfiuQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
