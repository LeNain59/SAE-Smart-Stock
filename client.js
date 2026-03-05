// client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zlbidvslsnoqkpkjtyhq.supabase.co"  // url de supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYmlkdnNsc25vcWtwa2p0eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNjUxNzAsImV4cCI6MjA4NTk0MTE3MH0.4YomOs5WKljLyMssHrQUeLMDZJejl7A45jSifLV-vzM"  // clef de supabase

export const supabase = createClient(supabaseUrl, supabaseKey)
