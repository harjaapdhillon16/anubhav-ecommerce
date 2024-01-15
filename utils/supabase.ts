import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://esjclezlkncojdacuftp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzamNsZXpsa25jb2pkYWN1ZnRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTMyMzA1NCwiZXhwIjoyMDIwODk5MDU0fQ.CL9fVbzCH7VNJ_dGBaCJmE4mtQnA-GFSf9TeJItZrdY'
)
