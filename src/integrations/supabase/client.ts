// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jkafkegbpfziexuanahe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYWZrZWdicGZ6aWV4dWFuYWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTA2OTYsImV4cCI6MjA1MDYyNjY5Nn0.jqhaJA5f6ZEzR14NMivITGIndcwnOZU-Kd6LKaWZFco";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);